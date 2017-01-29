require("any-promise/register/bluebird")
require("any-observable/register/rxjs-all")
require("app-module-path/cwd")

global.Promise = require("any-promise")
global.Observable = require("any-observable")

if (process.env.NODE_ENV !== "production") {
    require("dotenv/config")
}

const fs = require("fs")
const gql = require("graphql-tag")
const Loader = require("node-es-module-loader")
const loader = new Loader()

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
const listen = app => {
    // eslint-disable-next-line no-console
    const log = msg => console.log(chalk.blue.bold(msg))
    const { port, host } = config.app
    const listener = app().callback()
    const server = http.createServer()
        .on("request", listener)
        .listen({ port, host }, () =>
            log(`App listening on ${host || "ALL"}:${port}`))

    process.on("SIGTERM", code => {
        server.close()
        process.exit(code)
    })
}

const loadApp = () => loader.import("./server")
    .then(module => module.default)
    .catch(err => {
        // eslint-disable-next-line no-console
        console.error(err.stack)
        process.exit(1)
    })

if (!module.parent) {
    loadApp()
        .then(listen)
}

module.exports = loadApp
