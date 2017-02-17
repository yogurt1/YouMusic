require("./polyfills.server")
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
