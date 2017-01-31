require("any-promise/register/bluebird")
require("any-observable/register/rxjs-all")
require("app-module-path/cwd")
require("dotenv").config({ silent: true })

global.Promise = require("any-promise")
global.Observable = require("any-observable")

const gql = require("graphql-tag")
const fs = require("fs")

require.extensions[".gql"] =
    require.extensions[".graphql"] = (module, filename) => {
        const content = fs.readFileSync(filename, "utf-8")
        try {
            module.exports = JSON.parse(gql`${content}`)
        } catch (err) {
            err.message = `${filename}:${err.message}`
            throw err
        }
    }

const http = require("http")
const chalk = require("chalk")
const config = require("./config")
const app = () => require("./server").default

if (!module.parent) {
    const log = msg => console.log(chalk.blue.bold(msg))
    const { port, host } = config.app
    const listener = app().callback()
    const server = http.createServer()
        .on("request", listener)
        .listen({ port, host },
            () => log(`App listening on ${host || "ALL"}:${port}`))

    process.on("SIGTERM", code => {
        server.close()
        process.exit(code)
    })

}

module.exports = app
