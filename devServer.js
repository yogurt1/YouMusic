const config = require('./webpack.config')
const WDS = require('webpack-dev-server')
const w = require('webpack')
const compiler = w(config)
const hotMiddleware = require('webpack-hot-middleware')
const server = new WDS(compiler, {
    stats: "errors-only",
    hot: true,
    inline: true,
    setup(app) {
        app.use(hotMiddleware(compiler))
        app.use('*', (req, res, next) => {
            const re = /\.(js|json)$/
            if (re.test(req.originalUrl)) {
                return next()
            }
            
            const kapp = require('./server.babel')()
            kapp.onerror = next
            kapp.callback()(req, res)
        })
    }
})
server.listen(3000, () => console.log(`WDS listening on port 3000`))
