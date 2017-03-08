require("any-promise/register/bluebird")
require("ts-node/register")
require("dotenv").config({ silent: true })
require("app-module-path/cwd")
const ReactDOMServer = require("react-dom/server")
const React = require("react")
const { RedBoxError } = require("redbox-react")
const R = require("ramda")
const chalk = require("chalk")
const express = require("express")
const config = require("./config")
const devServer = express()

const { WEBPACK, npm_lifecycle_event: TARGET } = process.env
const isWebpack = (
    TARGET === "dev" &&
    typeof process.env.WEBPACK === "undefined"
        ? true
        : JSON.parse(WEBPACK)
)
const getApp = () => {
    const app = require("./server").default
    // TODO: Find better solution
    app.context.__devServer = pubsub
    return app
}
const types = R.zipObj(...R.repeat([
    "INIT",
    "ERROR",
    "MESSAGE",
    "UPDATE"
], 2))
const endpoint = "/__server_hmr"
const renderError = error => ReactDOMServer.renderToStaticMarkup(
    React.createElement(RedBoxError, { error })
)
const tmpl = ({ error }) => `
<span id="notification"></span>
<div id="error">${renderError(error)}</div>
<script>
    var n = document.getElementById("notification");
    var div = document.getElementById("error");
    var es = new EventSource("${endpoint}");
    es.onmessage = function(msg) {
        console.log("Got message", msg);
        var action = JSON.parse(msg.data);
        switch(action.type) {
            case "${types.UPDATE}":
                es.close();
                n.innerHTML = "<h1>Reloading...</h1>"
                return setTimeout(function() {
                    window.location.reload()
                }, 300)
            case "${types.ERROR}":
                return div.innerHTML = action.content;
        }
    }
</script>
`

const subscribers = []
const pubsub = new class PubSub {
    constructor () {
        this.subscribers = subscribers
        this.send = R.curryN(2, (action, res) => {
            console.log("sending action", action);
            const data = `data: ${JSON.stringify(action)}\n\n`
            res.write(data)
            console.log("sended action; done", action)
        })
    }

    publishUpdate () {
        this.publish({
            type: types.UPDATE
        })
    }

    publishError (error) {
        this.publish({
            type: types.ERROR,
            content: renderError(error)
        })
    }

    subscribe (res) {
        const i = this.subscribers.push(res)
        this.send({
            type: types.INIT
        }, res)

        return () => {
            this.subscribers.splice(i - 1, 1)
        }
    }

    publish (action) {
        R.forEach(this.send, this.subscribers)
    }
}

const watchApp = () => require("chokidar")
    .watch(["./app", "./server"])
    .on("change", () => {
        const re = /[\/\\](server|app)[\/\\]/

        R.pipe(
            R.filter(R.test(re)),
            R.forEach(id => delete require.cache[id])
        )(R.keys(require.cache))

        try {
            getApp()
            pubsub.publishUpdate()
        } catch (err) {
            pubsub.publishError(err)
        }
    })


devServer.get(endpoint, (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache"
    })

    const unsubscribe = pubsub.subscribe(res)

    req.on("close", () => {
        unsubscribe()
        res.end()
    })
})


if (isWebpack) {
    const HotMiddleware = require("webpack-hot-middleware")
    const DevMiddleware = require("webpack-dev-middleware")
    const webpackConfig = require("./webpack.config")
    const webpack = require("webpack")
    const compiler = webpack(webpackConfig)
    const devMiddleware = DevMiddleware(
        compiler,
        webpackConfig.devServer
    )

    console.log(devMiddleware.fileSystem)

    devServer
        .use(devMiddleware)
        .use(HotMiddleware(compiler))

    devServer.get("/__invalidate", (req, res) => {
        devMiddleware.invalidate()
        res.status(200).end()
    })
}

devServer.use((req, res, next) => {
    // Recompile app on each reload
    let isError = false
    let headersSent = false
    const onError = error => {
        isError = true
        if (!headersSent) {
            res.writeHead(200, {
                "Content-Type": "text/html"
            })
        }

        res.end(
            tmpl({ error })
        )
    }

    try {
        const nextApp = getApp()
        nextApp.onerror = onError
        nextApp.callback()(req, res)
        headersSent = true
    } catch (err) {
        return onError(err)
    } finally {
        if (!isError) {
            pubsub.publishUpdate()
            // TODO: Clean subscribers
            // pubsub.subscribers.splice(0,
            //     pubsub.subscribers.length
            // )
        }
    }
})

if (!module.parent) {
    watchApp()
    const {
        port,
        host = "localhost"
    } = config.app

    const enabledMsg = "Webpack enabled"
    const disabledMsg = "Webpack disabled. To enable try `WEBPACK=1` or `yarn dev`"
    console.log(
        chalk.bold.red(
            "Development mode.",
            chalk.underline(
                isWebpack
                    ? enabledMsg
                    : disabledMsg
            )
        )
    )

    devServer
        .listen({ port, host })
        .on("listening", () => console.log(
            chalk.blue(`App listening on ${host}:${port}`)
        ))
}

module.exports = pubsub
module.exports.tmpl = tmpl
