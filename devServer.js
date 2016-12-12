const config = require('./webpack.config')
const WDS = require('webpack-dev-server')
const Webpack = require('webpack')
const {renderToStaticMarkup} = require('react-dom/server')
const {createElement} = require('react')
const {RedBoxError} = require('redbox-react')
const app = require('./server.babel')

const compiler = Webpack(config)
app.watch() // hot-reload server code

const whitelist = [
    "app.bundle.js",
    "styles.bundle.css"
]

const server = new WDS(compiler, {
    stats: "errors-only",
    hot: true,
    inline: true,
    setup(devServer) {
        devServer.use((req, res, next) => {
            const re = /\.(js|css|json)$/
            if (re.test(req.url)) {
                return next()
            }
            const onErr = error => res.end(renderToStaticMarkup(
                createElement(RedBoxError, {error}, null)))

            try {
                app()
                    .on('error', onErr)
                    .callback()(req, res)
            } catch(err) {
                onErr(err)
            }
        })
    }
})

server.listen(3000, () => console.log(`WDS listening on port 3000`))
