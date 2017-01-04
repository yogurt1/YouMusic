const {renderToStaticMarkup} = require("react-dom/server")
const {createElement} = require("react")
const {RedBoxError} = require("redbox-react")

const subscribers = []
const subscribeEndpoint = "/__server_hmr"
const publish = action => subscribers.forEach(s =>
        s.write(`data: ${JSON.stringify(action)}\n\n`))

const renderRedBox = error => renderToStaticMarkup(
    createElement(RedBoxError, {error}))

const subscribe = (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache"
    })

    const id = subscribers.push(res) - 1

    req.on("close", () => {
        subscribers.splice(id, 1)
    })
}

const types = {
    ERROR: "ERROR",
    UPDATE: "UPDATE"
}

const tmpl = err => `
<span id="notification"></span>
<div id="err">${renderRedBox(err)}</div>
<script>
    var n = document.getElementById("notification");
    var div = document.getElementById("err");
    var es = new EventSource("${subscribeEndpoint}");
    es.onmessage = function(msg) {
        var action = JSON.parse(msg.data);
        switch(action.type) {
            case "${types.UPDATE}":
                es.close();
                n.innerHTML = "<h1>Reloading...</h1>"
                setTimeout(function() {
                    window.location.reload()
                }, 300)
                break;
            case "${types.ERROR}":
                div.innerHTML = content;
                break;
        }
    }
</script>
`

const onError = (req, res) => err => {
    res.set("Content-Type", "text/html")
    res.end(tmpl(err))
}

const run = () => {
    const HotMiddleware = require("webpack-hot-middleware")
    const DevMiddleware = require("webpack-dev-middleware")
    const config = require("./webpack.config")
    const webpack = require("webpack")
    const compiler = webpack(config)
    const devServer = require("express")()
    const app = require("./server.node")
    const devMiddleware = DevMiddleware(compiler, config.devServer)

    app.watch(() => {
        try {
            app()
            publish({type: types.ERROR})
        } catch(err) {
            publish({type: types.UPDATE,
                content: renderRedBox(err)})
        }
    })

    devServer
        .get(subscribeEndpoint, subscribe)
        .use(devMiddleware)
        .use(HotMiddleware(compiler))

    devServer.get("/__invalidate", (req, res) => {
        devMiddleware.invalidate()
        res.status(200).end()
    })

    devServer.all("*", (req, res, next) => {
        const onerror = onError(req, res)

        try {
            const nextApp = app()
            publish({type: types.UPDATE})
            nextApp.onerror = onerror
            nextApp.callback()(req, res)
        } catch(err) {
            onerror(err)
        }
    })

    const port = process.env.PORT || 3000
    devServer.listen(port, () =>
        console.log(`WDS listening on port ${port}`))
}

if (!module.parent) run()

module.exports = {
    types,
    onError,
    renderRedBox,
    run,
    tmpl,
    subscribers,
    subscribeEndpoint,
    subscribe,
    publish
}
