global.Promise = require("bluebird")
global.DEV = process.env.NODE_ENV !== "production"
if (DEV) require("dotenv/config")

const gql = require("graphql-tag")
const tsconfig = require("./tsconfig")
tsconfig.compilerOptions.module = "commonjs"

Object.assign(tsconfig, {
    lazy: true,
    fast: true
})

require("app-module-path/cwd")
// require("systemmjs")
require("source-map-support/register")
require("ts-node").register(tsconfig)

require.extensions[".gql"] = (module, filename) => {
    const content = fs.readFileSync(filename, "utf-8")
    try {
        module.exports = JSON.parse(gql`${content}`)
    } catch(err) {
        err.message = `${filename}:${err.message}`
        throw err
    }
}

// global.System = {
//     import(m) {
//         try {
//             return Promise.resolve(require(m))
//         } catch(err) {
//             return Promise.reject(m)
//         }
//     }
// }

const http = require("http")
const config = require("./server/config").default
const app = () => require("./server").default

app.config = config
app.getListener = () => app().callback()
app.watch = done => require("chokidar").watch("./server")
    .on("change", () => {
        const re = /[\/\\]server[\/\\]/

        for (const id in require.cache) {
            if (re.test(id)) {
                delete require.cache[id]
            }
        }

        if (typeof(done) === "function") {
            done()
        }
    })

if (!module.parent) {
    const {port} = config.app
    const server = http.createServer()
        .on("request", app.getListener())
        .listen(port, () => {
            console.log(`Koa listening on port ${port}`)
        })

    process.on("SIGTERM", code => {
        server.close()
        process.exit(code)
    })

    if (DEV) {
        console.log("Development mode!")

        const devServer = require("./devServer")
        const subscribeRe = require("path-to-regexp")(devServer.subscribeEndpoint)

        app.watch(() => {
            try {
                app()
                console.log("Send update")
                devServer.publish({ type: devServer.types.UPDATE })
            } catch(err) {
                devServer.publish({
                    type: devServer.types.ERROR,
                    content: devServer.renderRedBox(err)
                })
            }
        })

        server
            .removeAllListeners("request")
            .on("request", (req, res) => {
                if (subscribeRe.test(req.url)) {
                    return devServer.subscribe(req, res)
                }

                const onerror = devServer.onError(req, res)
                try {
                    const nextApp = app()
                    nextApp.onerror = onerror
                    nextApp.callback()(req, res)
                    devServer.publish({type: devServer.types.UPDATE})
                } catch(err) {
                    onerror(err)
                }
            })
    }
}


module.exports = app
