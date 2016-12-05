const _config = Object.assign({babelrc: false},
    require('./babel.preset').buildPreset({env: "node"}))
require('app-module-path/cwd')
require('source-map-support/register')
require('babel-register')(_config)
global.Promise = require('bluebird')
global.DEV = global.__DEV__ = process.env.NODE_ENV !== 'production'

const http = require('http')
const chokidar = require('chokidar')
const {default: config} = require('./app/config')

const app = () => require('./app/server').default
app.config = config
app.watch = () => chokidar.watch('./app').on('change', () => {
    const re = /[\/\\]app[\/\\]/
    for (const id in require.cache) {
        if (re.test(id)) {
            delete require.cache[id]
        }
    }
})

module.exports = app
if (!module.parent) {
    const {port: PORT} = config.server
    const server = http.createServer()
        .on('request', app().callback())
        .listen(PORT, () => {
            console.log(`Koa listening on port ${PORT}`)
        })

    if (DEV) {
        app.watch()
        server
            .removeAllListeners('request')
            .on('request', (req, res) => app().callback()(req, res))
    }
}
