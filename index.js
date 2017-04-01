require('any-promise/register/bluebird')
require('any-observable/register/rxjs-all')
require('app-module-path').config({ path: __dirname })

const Loader = require('system-register-loader')
// const Loader = require('node-es-module-loader')
const http = require("http")
const chalk = require("chalk")
const loader = new Loader(__dirname)

(async () => {
    const { default: config } = await loader.import('./server/config')
    const { default: app } = await loader.import('./server')
    const { port, host } = config.app
    const onError = (err) => {
        console.log(chalk.red.underline(err.message))
        debugger
        process.exit(1)
    }

    const onRequest = app.callback()
    // const onUpgrade = socket.callback()
    const server = http.createServer()
        .on('request', onRequest)
        // .on('upgrade', onUpgrade)
        .on('listening', (err) => {
            if (err) {
                logError(err)
                throw err
            }

            log(`App listening on port ${port}`)
        })
        .listen({ port })

    process.on('exit', (code) => {
        server.close()
    })
})()

