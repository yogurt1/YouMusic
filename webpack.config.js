const path = require("path")
const webpack = require("webpack")
const ExtractText = require("extract-text-webpack-plugin")
const {CheckerPlugin, TsConfigPathsPlugin} = require("awesome-typescript-loader")
const isProduction = !!(
    "build" === process.env.npm_lifecycle_event ||
    "production" === process.env.NODE_ENV
)

const devtool = isProduction ? "source-map" : "cheap-module-inline-source-map"
const config = module.exports = {
    devtool,
    performance: { hints: false },
    entry: {
        app: ["./app/client.tsx"]
    },
    output: {
        path: path.resolve("./static/assets"),
        publicPath: "/assets/",
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js",
        devtoolModuleFilenameTemplate: "w:///[resourcePath]?[hash]"
        // devtoolModuleFilenameTemplate: "/[resourcePath]"
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"],
        alias: {
            "app": path.resolve("./app"),
            "styled-components$": "styled-components/lib/index.js"
        }
    },
    devServer: {
        stats: "errors-only",
        publicPath: "/assets/",
        noInfo: true,
        inline: true,
        hot: true,
        historyApiFallback: true
    },
    node: {
        global: true,
        net: "mock",
        dns: "mock"
        // child_process: "mock"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                exclude: /(node_modules|\/vendor\.js$)/
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: "graphql-tag/loader"
            },
            {
                test: /\.css$/,
                loader: ExtractText.extract({
                    fallbackLoader: "style-loader?-singleton&insertAt=top",
                    loader: "css-loader?-mimize&-autorepfixer&-sourceMap"
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
        new CheckerPlugin(),
        new TsConfigPathsPlugin({
            tsconfig: "tsconfig.json",
            configFilename: "tsconfig.json",
            compiler: "typescript"
        }),
        new ExtractText({
            allChunks: true,
            disable: !isProduction,
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
                "NODE_ENV": JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
}

if (isProduction) {
    const OptimizeJsPlugin = require("optimize-js-plugin")
    const CompressionPlugin = require("compression-webpack-plugin")
    const LodashPlugin = require("lodash-webpack-plugin")
    const ImageminPlugin = require("imagemin-webpack-plugin").default
    const BabiliPlugin = require("babili-webpack-plugin")

    // config.entry["vendor"] = "./app/vendor.js"
    config.plugins.push(
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "vendor"
        // }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new LodashPlugin(),
        new ImageminPlugin(),
        new OptimizeJsPlugin(),
        new CompressionPlugin(),
        new BabiliPlugin()
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
        // })
    )
} else {
    config.plugins.unshift(
        new webpack.NoErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    )
    config.entry["app"].unshift(
        "react-hot-loader/patch",
        "webpack-hot-middleware/client?overlay=true&reload=false&noInfo=true"
    )
}
