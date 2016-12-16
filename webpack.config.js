const path = require('path')
const webpack = require('webpack')
const ExtractText = require('extract-text-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const isProduction = (
    "build" === process.env.npm_lifecycle_event ||
    "production" === process.env.NODE_ENV
)

const devtool = isProduction ? 'source-map' : '#eval-source-ma<F12>p'
const config = module.exports = {
    performance: {
        hints: isProduction && "warning"
    },
    devtool,
    entry: {
        app: ["./app/client.jsx"]
    },
    output: {
        path: path.resolve("./static"),
        publicPath: "/",
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js",
        devtoolModuleFilenameTemplate: "w:///[resourcePath]?[hash]"
        // devtoolModuleFilenameTemplate: "/[absolute-resource-path]"
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
                exclude: /(node_modules|\/vendor\.js$)/,
                options: require("./babel.preset").setup("browser")
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader'
            },
            {
                test: /\.css$/,
                loader: ExtractText.extract({
                    fallbackLoader: 'style-loader?-singleton&insertAt=top',
                    loader: 'css-loader?-mimize&-autorepfixer&-sourceMap'
                })
            },
            {
                test: /\.(jpe?g|webp|bmp|ico|png|svg|woff2?|ttf|eot)/,
                loader: "url-loader",
                options: {
                    limit: 10240
                }
            }
        ]
    },
    plugins: [
        new ExtractText({
            allChunks: true,
            disable: !isProduction, // !isProduction,
            filename: "styles.bundle.css"
        }),
        new webpack.ProvidePlugin({
            "Promise": "bluebird"
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: isProduction
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
    const {babili} = require('./babel.preset')
    const BabiliPlugin = require('babili-webpack-plugin')
    const CompressionPlugin = require("compression-webpack-plugin")
    config.plugins.push(
        new webpack.optimize.AggressiveMergingPlugin(),
        new ImageminPlugin(),
        new BabiliPlugin({
            // preset: babili(),
            test: /\.jsx?/
        }),
        new CompressionPlugin()
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         dead_code: true,
        //         drop_debugger: true,
        //         sequences: true,
        //         unsafe: true,
        //         conditionals: true,
        //         comparisons: true,
        //         properties: true,
        //         booleans: true,
        //         evaluate: true,
        //         loops: true,
        //         unused: true,
        //         hoist_funs: true,
        //         hoist_vars: true,
        //         if_return: true,
        //         join_vars: true,
        //         cascade: true,
        //         negate_iife: true,
        //         pure_getters: true,
        //         drop_console: true,
        //         screw_ie8: true
        //     },
        //     mangle: {
        //         screw_ie8: true
        //     }
        // }),
    )
} else {
    config.plugins.unshift(
        new webpack.NoErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    )
    config.entry["app"].unshift(
        "react-hot-loader/patch",
        "webpack-hot-middleware/client?overlay=true&reload=false"
    )
}
