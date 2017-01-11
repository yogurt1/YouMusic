const gql = require("graphql-tag")
global.Promise = require("bluebird")
global.DEV = process.env.NODE_ENV !== "production"
if (DEV) require("dotenv/config")

require("app-module-path/cwd")
require("source-map-support/register")

require.extensions[".gql"] = (module, filename) => {
    const content = fs.readFileSync(filename, "utf-8")
    try {
        module.exports = JSON.parse(gql`${content}`)
    } catch(err) {
        err.message = `${filename}:${err.message}`
        throw err
    }
}

const http = require("http")
const config = require("./config")
const app = () => require("./server").default

if (!module.parent) {
    const { port } = config.app
    const server = http.createServer()
        .on("request", app().callback())
        .listen(port, () => {
            console.log(`App listening on port ${port}`)
        })

    process.on("SIGTERM", code => {
        server.close()
        process.exit(code)
    })
}


module.exports = app
