const config = require('./webpack.config')
const WDS = require('webpack-dev-server')
const Webpack = require('webpack')
const app = require('./server.babel')

const compiler = Webpack(config)
app.watch() // hot-reload server code

const server = new WDS(compiler, {
    stats: "errors-only",
    hot: true,
    inline: true,
    setup(devServer) {
        devServer.use((req, res, next) => {
            const re = /\.(js|json)$/
            if (re.test(req.url)) {
                return next()
            }

            try {
                app()
                    .on('error', next)
                    .callback()(req, res)
            } catch(err) {
                next(err)
            }
        })
    }
})

server.listen(3000, () => console.log(`WDS listening on port 3000`))
