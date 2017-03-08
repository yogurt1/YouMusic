require("any-promise/register/bluebird")
require("any-observable/register/rxjs-all")
require("app-module-path").config({ path: __dirname })

const SystemRegisterLoader = require('system-register-loader')
const http = require("http")
const chalk = require("chalk")
const R = require("ramda")
const config = require("./config")
const loader = new SystemRegisterLoader(__filename)

loader.import('./server')
    .then(namespace => {
        const server = namespace.default

        const { port, host } = config.app
        const log = R.pipe(
            chalk.blue.bold,
            console.log
        )

        const listener = app().callback()
        const server = http.createServer()
            .on("request", listener)
            .on("listening",
                () => log(`App listening on port ${port}`)
            )
            .listen({ port })

        process.on("SIGTERM", code => {
            server.close()
            process.exit(code)
        })
    })

