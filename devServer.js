const config = require('./webpack.config')
const Webpack = require('webpack')
const {renderToStaticMarkup} = require('react-dom/server')
const {createElement} = require('react')
const {RedBoxError} = require('redbox-react')
const hotMiddleware = require('webpack-hot-middleware')
const devMiddleware = require("webpack-dev-middleware")
const devServer = require("express")()
const app = require('./server.babel')

const compiler = Webpack(config)
app.watch() // hot-reload server code

devServer
    .use(devMiddleware(compiler, config.devServer))
    .use(hotMiddleware(compiler))

devServer.use((req, res, next) => {
    if (/\.(js|json|css)$/.test(req.url)) return next()

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

devServer.listen(3000, () => console.log(`WDS listening on port 3000`))
