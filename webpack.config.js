const path = require('path')
const webpack = require('webpack')
const isProduction = (
    "build" === process.env.npm_lifecycle_event ||
    "production" === process.env.NODE_ENV
)

const devtool = isProduction ? 'source-map' : 'cheap-module-inline-source-map'
const config = module.exports = {
    devtool,
    entry: {
        app: ["./app/client.jsx"]
        // vendor: []
    },
    output: {
        path: path.resolve("./static"),
        publicPath: "/",
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
    },
    resolve: {
        alias: {
            "app": path.resolve("./app"),
            "styled-components$": "styled-components/lib/index.js"
        },
        extensions: [".js", ".jsx", ".json"]
    },
    devServer: {
        stats: "errors-only",
        publicPath: "/",
        noInfo: true,
        inline: true,
        hot: true,
        historyApiFallback: true
    },
    node: {
        global: true,
        net: "mock",
        dns: "mock"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader'
            },
            {
                test: /\.(png|svg|woff2?|ttf|eot)/,
                loader: "url-loader"
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            "Promise": "bluebird"
        }),
        new webpack.LoaderOptionsPlugin({
            devtools: isProduction ? 'source-map' : 'inline-source-map',
            minimize: isProduction
            // debug: !isProduction
        }),
        new webpack.DefinePlugin({
            DEV: !isProduction,
            __DEV__: !isProduction,
            "typeof window": JSON.stringify("object"),
            "process.env": {
                "NODE_ENV": JSON.stringify(isProduction ? 'production' : 'development')
            }
        })
    ]
}

if (isProduction) {
    const BabiliPlugin = require('babili-webpack-plugin')
    const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
    config.plugins.push(
        new webpack.optimize.AggressiveMergingPlugin(),
        new BabiliPlugin({test: /\.jsx?/})
    )
} else {
    config.plugins.unshift(
        new webpack.NoErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    )
    config.entry["app"].unshift(
        "react-hot-loader/patch",
        "webpack-dev-server/client?http://localhost:3000",
        "webpack/hot/dev-server"
        // "webpack-hot-middleware/client"
    )
}
