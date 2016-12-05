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
const app = module.exports = () => require('./app/server').default
const watch = module.exports.watch = () => chokidar.watch('./app')
    .on('change', () => {
        const re = /[\/\\]app[\/\\]/
        for (const id in require.cache) {
            if (re.test(id)) {
                delete require.cache[id]
            }
        }
    })

if (!module.parent) {
    const {port: PORT} = require('./app/config').default
    const server = http.createServer()
        .on('request', app().callback())
        .listen(PORT, () => {
            console.log(`Koa listening on port ${PORT}`)
        })

    if (DEV) {
        server
            .removeAllListeners('request')
            .on('request', (req, res) => app().callback()(req, res))
    }
}
