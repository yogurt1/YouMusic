const _babelConfig = Object.assign({babelrc: false},
    require('./babel.preset').buildPreset({env: "node"}))
require('app-module-path/cwd')
require('source-map-support/register')
require('babel-register')(_babelConfig)
require('isomorphic-fetch')
global.Promise = require('bluebird')
global.DEV = global.__DEV__ = process.env.NODE_ENV !== 'production'
global.APP_ENV = process.env.APP_ENV || "local"
if (DEV) require('dotenv/config')

const http = require('http')
const {default: config} = require('./app/server/config')

const app = () => require('./app/server').default
app.config = config
app.watch = () => require('chokidar').watch('./app')
    .on('change', () => Object.keys(require.cache)
        .filter(id => /[\/\\]app[\/\\]/.test(id))
        .forEach(id => delete require.cache[id]))

module.exports = app

if (!module.parent) {
    const {port: PORT} = config.app
    const server = http.createServer()
        .on('request', app().callback())
        .listen(PORT, () => {
            console.log(`Koa listening on port ${PORT}`)
        })

    if (DEV) {
        app.watch()
        console.log('Development mode!')
        server
            .removeAllListeners('request')
            .on('request', (req, res) => {
                app().callback()(req, res)
            })
    }
}
