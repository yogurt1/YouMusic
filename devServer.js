const app = require("./server.node")
const { renderToStaticMarkup } = require("react-dom/server")
const { createElement } = require("react")
const { RedBoxError } = require("redbox-react")
const express = require("express")
const chalk = require("chalk")
const config = require("./config")
const tsconfig = require("./tsconfig.json")
const tsnode = require("ts-node")
const devServer = express()

tsnode.register(tsconfig)

const tmpl = ({ error, types, endpoint }) => `
<span id="notification"></span>
<div id="error">${error}</div>
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
        this.types = [
            "INIT",
            "ERROR",
            "MESSAGE",
            "UPDATE"
        ].reduce((ac, t) => {
            ac[t] = t
            return ac
        }, {})
    }

    renderError (error) {
        const el = createElement(RedBoxError, { error })
        const html = renderToStaticMarkup(el)
        return html
    }

    render (err) {
        return tmpl({
            error: this.renderError(err),
            types: this.types,
            endpoint: this.endpoint
        })
    }

    subscribe ({ res }) {
        const { subscribers, types } = this
        const id = subscribers.push(res) - 1
        this.publish({ type: types.INIT })

        return function unsubscribe() {
            subscribers.splice(id, 1)
        }
    }

    publish (action) {
        const { subscribers } = this
        const json = JSON.stringify(action)
        const data = `data: ${json}\n\n`

        for (const subscriber of subscribers) {
            subscriber.write(data)
        }
    }

    onError (req, res) {
        return err => {
            res.writeHead(200, {
                "Content-Type": "text/html"
            })

            res.end(this.render(err))
         }
    }
}

const watchApp = () => require("chokidar")
    .watch(["./server","./app"]).on("change", () => {
        const re = /[\/\\](server|app)[\/\\]/

        Object.keys(require.cache)
            .filter(id => re.test(id))
            .forEach(id => delete require.cache[id])

        try {
            app()
            // publish({ type: pubsub.types.UPDATE })
        } catch (err) {
            publish({
                type: types.ERROR,
                content: pubsub.renderError(err)
            })
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
        const nextApp = require("./server").default
        nextApp.onerror = onError
        nextApp.callback()(req, res)
    } catch (err) {
        return onError(err)
    } finally {
        if (!isError) {
            pubsub.publish({ type: pubsub.types.UPDATE })
        }
    }
})

if (!module.parent) {
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
