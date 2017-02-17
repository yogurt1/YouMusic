require("./polyfills.server")
require("tsnode/register")
const { renderToStaticMarkup } = require("react-dom/server")
const { createElement } = require("react")
const { RedBoxError } = require("redbox-react")
const R = require("ramda")
const express = require("express")
const chalk = require("chalk")
const config = require("./config")
const devServer = express()

const app = () =>
{
    const _ = require("./server").default
    _.context.__devServer = pubsub
    return _
}

tsnode.register(tsconfig)

const tmpl = ({ html, types, endpoint }) => `
<span id="notification"></span>
<div id="error">${html}</div>
<script>
    var n = document.getElementById("notification");
    var div = document.getElementById("error");
    var es = new EventSource("${endpoint}");
    es.onmessage = function(msg) {
        var action = JSON.parse(msg.data);
        switch(action.type) {
            case "${types.UPDATE}":
                es.close();
                n.innerHTML = "<h1>Reloading...</h1>"
                return setTimeout(function() {
                    window.location.reload()
                }, 300)
            case "${types.ERROR}":
                return div.innerHTML = content;
        }
    }
</script>
`

const pubsub = new class PubSub {
    constructor () {
        this.subscribers = []
        this.endpoint = "/__server_hmr"
        this.types = R.zipObj(...R.repeat([
            "INIT",
            "ERROR",
            "MESSAGE",
            "UPDATE"
        ], 2))

        this.renderError = R.pipe(
            (error) => ({ error }),
            R.curry(createElement)(RedBoxError),
            renderToStaticMarkup
        )

        this.render = error => tmpl(R.assoc('html',
            this.renderError(error),
            R.pick(['types', 'endpoint'], this)
        ))
    }

    publishUpdate() {
        const { UPDATE } = this.types
        this.publish({ type: UPDATE })
    }

    publishError(error) {
        const { ERROR } = this.types
        this.publish({ type: ERROR, content: this.renderError(error) })
    }

    publishInit() {
        const { INIT } = this.types
        this.publish({ type: INIT })
    }

    subscribe ({ res }) {
        const i = this.subscribers.push(res)
        this.publishInit()

        return () => {
            this.subscribers.splice(i - 1, 1)
        }
    }

    publish (action) {
        const data = `data: ${JSON.stringify(action)}\n\n`
        R.forEach(s => s.write(data), this.subscribers)
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
            app()
            pubusb.publishUpdate()
        } catch (err) {
            pubsub.publishError(error)
        }
    })


devServer.get(pubsub.endpoint, (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache"
    })

    const unsubscribe = pubsub.subscribe(req)

    req.on("close", () => {
        unsubscribe()
        res.end()
    })
})


if (config.webpack.isWebpack) {
    const HotMiddleware = require("webpack-hot-middleware")
    const DevMiddleware = require("webpack-dev-middleware")
    const webpackConfig = require("./webpack.config")
    const webpack = require("webpack")
    const compiler = webpack(webpackConfig)
    const devMiddleware = DevMiddleware(compiler,
        webpackConfig.devServer)

    devServer
        .use(devMiddleware)
        .use(HotMiddleware(compiler))

    devServer.get("/__invalidate", (req, res) => {
        devMiddleware.invalidate()
        res.status(200).end()
    })
}

devServer.use((req, res, next) => {
    let isError = false
    const onError = err => {
        isError = true
        res.writeHead(200, {
            "Content-Type": "text/html"
        })

        res.end(pubsub.render(err))
    }

    try {
        const nextApp = app()
        nextApp.onerror = onError
        nextApp.callback()(req, res)
    } catch (err) {
        return onError(err)
    } finally {
        if (!isError) {
            pubsub.publishUpdate()
        }
    }
})

if (!module.parent) {
    watchApp()
    const {
        port,
        host = "localhost"
    } = config.app

    console.log(chalk.bold.red("Development mode.",
        chalk.underline(`Webpack ${config.webpack.isWebpack ? "enabled"
            : "disabled. To enable try `WEBPACK=1 or `yarn dev`"
        }`)))

    devServer.listen({ port, host }, () =>
        console.log(chalk.blue(`App listening on ${host}:${port}`)))
}

module.exports = pubsub
