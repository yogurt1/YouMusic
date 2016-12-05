// const preset = Object.assign(require('./babel.preset'),{babelrc:false})
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
const {default: app} = require('./app/server')
module.exports = () => require('./app/server').default

if (module.parent) return
const {port: PORT} = config.app
const server = http.createServer()
    .on('request', app.callback())
    .listen(PORT, () => {
        console.log(`Koa listening on port ${PORT}`)
    })

if (DEV) {
    server
        .removeAllListeners('request')
        .on('request', (req, res) => require('./app/server')
            .default.callback()(req, res))

    // const re = /(node_modules|webpack\.config)/
    const re = /[\/\\]app[\/\\]/
    chokidar.watch('./app').on('change', () => {
        for (const id in require.cache) {
            if (re.test(id)) {
                delete require.cache[id]
            }
        }
    })
}
