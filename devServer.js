const config = require('./webpack.config')
const Webpack = require('webpack')
const {renderToStaticMarkup} = require('react-dom/server')
const {createElement} = require('react')
const {RedBoxError} = require('redbox-react')
const hotMiddleware = require('webpack-hot-middleware')
const devMiddleware = require("webpack-dev-middleware")
const devServer = require("express")()
const app = require('./server.babel')

const compiler = Webpack(config)
const subscribers = []
const publish = action => subscribers.forEach(s =>
        s.write(`data: ${JSON.stringify(action)}\n\n`))
const renderRedBox = error => renderToStaticMarkup(
    createElement(RedBoxError, {error}))

app.watch(() => {
    try {
        app()
        publish({type: "update"})
    } catch(err) {
        publish({type: "error", content: renderRedBox(err)})
    }
})

devServer.get("/__server_hmr", (req, res) => {
    res.set("Content-Type", "text/event-stream")
    res.set("Cache-Control", "no-cache")
    const id = subscribers.push(res) - 1

    req.on("close", () => {
        subscribers.splice(id, 1)
    })
})

devServer
    .use(devMiddleware(compiler, config.devServer))
    .use(hotMiddleware(compiler))

devServer.use((req, res, next) => {
    const onError = err => {
        res.set("Content-Type", "text/html")
        res.end(`
            <span id="notification"></span>
            <div id="err">${renderRedBox(err)}</div>
            <script>
                var es = new EventSource("__server_hmr");
                es.onmessage = function(msg) {
                    var action = JSON.parse(msg.data);
                    switch(action.type) {
                        case "update":
                            es.close();
                            var n = document.getElementById("notification");
                            n.innerHTML = "<h1>Reloading...</h1>"
                            setTimeout(function() {
                                window.location.reload()
                            }, 300)
                            return;
                        window.location.reload();
                        case "error":
                            var div = document.getElementById("err");
                            div.innerHTML = content;
                            return;
                    }
                }
            </script>
        `)
    }

    try {
        const nextApp = app()
        publish({type: "update"})
        nextApp.onerror = onError
        nextApp.callback()(req, res)
    } catch(err) {
        onError(err)
    }
})

const PORT = process.env.PORT || 3000
devServer.listen(PORT,
    () => console.log(`WDS listening on port ${PORT}`))
