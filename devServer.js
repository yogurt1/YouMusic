const config = require('./webpack.config')
const WDS = require('webpack-dev-server')
const Webpack = require('webpack')
const compiler = Webpack(config)
const server = new WDS(compiler, {
    stats: "errors-only",
    inline: true,
    hot: true
})

server.listen(3000, () => console.log(`WDS listening on port 3000`))
