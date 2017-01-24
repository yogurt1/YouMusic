require("any-promise/register/bluebird")
require("any-observable/register/rxjs-all")
require("app-module-path/cwd")

global.Promise = require("any-promise")
global.DEV = process.env.NODE_ENV !== "production"
if (DEV) {
    require("dotenv/config")
}

const gql = require("graphql-tag")
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
const chalk = require("chalk")
const config = require("./config")
const app = () => require("./server").default

if (!module.parent) {
    const { port, host } = config.app
    const listener = app().callback()
    const server = http.createServer()
        .on("request", listener)
        .listen({ port, host }, () =>
            console.log(chalk.blue.bold(
                `App listening on ${host || "ALL"}:${port}`
            )))

    process.on("SIGTERM", code => {
        server.close()
        process.exit(code)
    })
}


module.exports = app
