require('app-module-path/cwd')
require('source-map-support/register')
require('isomorphic-fetch')
require("babel-register")(require("./babel.preset").setup("node"))

global.Promise = require('bluebird')
global.DEV = global.__DEV__ = process.env.NODE_ENV !== 'production'
global.APP_ENV = process.env.APP_ENV || "local"
if (DEV) require('dotenv/config')

const http = require('http')
const {default: config} = require('./app/server/config')

const app = () => require('./app/server').default
app.config = config
app.watch = () => require('chokidar').watch('./app')
    .on('change', () => {
        const re = /[\/\\]app[\/\\]/
        for (const id in require.cache) {
            if (re.test(id)) {
                delete require.cache[id]
            }
        }
        console.log("Server reloaded")
    })

module.exports = app

if (!module.parent) {
    const {port: PORT} = config.app
    const listener = app().callback()
    const server = http.createServer()
        .on('request', listener)
        .listen(PORT, () => {
            console.log(`Koa listening on port ${PORT}`)
        })

    if (DEV) {
        app.watch()
        console.log('Development mode!')
        server
            .removeListener('request', listener)
            .on('request', (req, res) => {
                app().callback()(req, res)
            })
    }
}
