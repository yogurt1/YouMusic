require('app-module-path/cwd')
require('source-map-support/register')
require('isomorphic-fetch')
require("babel-register")(require("./babel.preset").setup("node"))

global.Promise = require('bluebird')
global.DEV = global.__DEV__ = process.env.NODE_ENV !== 'production'
global.APP_ENV = process.env.APP_ENV || "local"
if (DEV) require('dotenv/config')

const http = require('http')
const {default: config} = require('./server/config')

const app = () => require('./server').default
app.config = config
app.watch = done => require('chokidar').watch('./server')
    .on('change', () => {
        Object.keys(require.cache)
            .filter(id => /[\/\\]server[\/\\]/.test(id))
            .forEach(id => delete require.cache[id])

        if (typeof(done) === "function") {
            done()
        }
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
        console.log('Development mode!')
        app.watch()
        server
            .removeListener('request', listener)
            .on('request', (req, res) => {
                app().callback()(req, res)
            })
    }
}
