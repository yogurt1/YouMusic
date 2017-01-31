const path = require("path")
const webpack = require("webpack")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const OptimizeJsPlugin = require("optimize-js-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const ImageminPlugin = require("imagemin-webpack-plugin").default
const { NODE_ENV } = process.env
const isProduction = NODE_ENV === "production"


const config = {
    devtool: 'source-map',
    node: {
        global: true,
        net: "mock",
        dns: "mock"
    },
    output: {
        filename: "[name].dll.js",
        path: path.join(__dirname, "./static/assets"),
        library: "[name]_dll"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader"
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
    entry: {
        vendor: [ "./app/vendor.js" ]
    },
    resolve: {
        alias: {
            "styled-componets$": "styled-components/lib/index.js"
        }
    },
    plugins: [
        new OptimizeJsPlugin(),
        new webpack.DefinePlugin({
            "typeof window": JSON.stringify("object"),
            "process.env": {
                "NODE_ENV": JSON.stringify(NODE_ENV)
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            autoprefixer: true
        }),
        new webpack.ProvidePlugin({
            "Promise": "bluebird"
        }),
        new webpack.DllPlugin({
            path: './static/assets/[name].manifest.json',
            name: '[name]_dll'
        }),
        new ExtractTextPlugin({
            allChunks: true,
            disable: false,
            filename: "[name].dll.css"
        })
    ]
}

if (process.env.NODE_ENV === "production") {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
                dead_code: true,
                drop_debugger: true,
                sequences: true,
                unsafe: true,
                conditionals: true,
                comparisons: true,
                properties: true,
                booleans: true,
                evaluate: true,
                loops: true,
                unused: true,
                hoist_funs: true,
                hoist_vars: true,
                if_return: true,
                join_vars: true,
                cascade: true,
                negate_iife: true,
                pure_getters: true,
                drop_console: true,
                screw_ie8: true
            },
            mangle: {
                screw_ie8: true
            }
        }),
        new ImageminPlugin(),
        new CompressionPlugin()
    )
}

module.exports = config

