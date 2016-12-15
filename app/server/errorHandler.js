import mount from "koa-mount"
import {createElement} from "react"
import {RedBoxError} from "redbox-react"
import {renderToStaticMarkup} from "react-dom/server"

const subscribers = []
const publish = action => subscribers.forEach(ctx =>
        ctx.res.write(`data: ${JSON.stringify(action)} \n\n`))

const renderRedBox = error => renderToStaticMarkup(
    createElement(RedBoxError, {error}))

const renderHtml = content => `
    <span id="notification"></span>
    <div id="err">${content}</div>
    <script>
        var div = document.getElementById("err");
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
                case "error":
                    div.innerHTML = content;
                    return;
            }
        }
    </script>
`

export default app => {
    app.use(mount("/__server__hmr", async ctx => {
        ctx.set("Cache-Control", "no-cache")
        // ctx.set("Content-Type", "text/event-stream")
        ctx.type = "text/event-stream"
        const id = subscribers.push(ctx) - 1

        ctx.req.on("close", () => {
            subscribers.splice(id, 1)
        })
    }))

    app.use(async (ctx, next) => {
        try {
            await next()
            publish({type: "update"})
        } catch(err) {
            const content = renderRedBox(err)
            publish({type: "error", content})
            ctx.body = renderHtml(content)
        }
    })
}
