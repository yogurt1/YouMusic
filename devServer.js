const config = require('./webpack.config')
const WDS = require('webpack-dev-server')
const Webpack = require('webpack')
// const hotMiddleware = require('webpack-hot-middleware')
const app = require('./server.babel')

const compiler = Webpack(config)
app.watch()

const server = new WDS(compiler, {
    stats: "errors-only",
    hot: true,
    inline: true,
    setup(dev) {
        // app.use(hotMiddleware(compiler))
        dev.use('*', (req, res, next) => {
            const re = /\.(js|json)$/
            if (re.test(req.originalUrl)) {
                return next()
            }

            app().on('error', next)
                .callback()(req, res)         
        })
    }
})
server.listen(3000, () => console.log(`WDS listening on port 3000`))
