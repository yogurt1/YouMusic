const path = require('path')
const webpack = require('webpack')
const ExtractText = require('extract-text-webpack-plugin')
// const ImageminPlugin = require('imagemin-webpack-plugin').default
const isProduction = (
    "build" === process.env.npm_lifecycle_event ||
    "production" === process.env.NODE_ENV
)

const config = module.exports = {
    devtool: isProduction ? false : "#eval-source-map",
    entry: {
        bundle: ["./src/entry.js"]
    },
    output: {
        path: path.resolve("./assets"),
        publicPath: "asses/",
        filename: "[name].js",
        devtoolModuleFilenameTemplate: "/[absolute-resource-path]"
    },
    resolve: {
        extensions: [".vue", ".js", ".json"],
        alias: {
            vue: "vue/dist/vue.common.js"
        }
    },
    devServer: {
        stats: "errors-only",
        noInfo: true,
        inline: true,
        hot: true,
        historyApiFallback: true
    },
    node: {
        global: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "buble-loader",
                exclude: /(node_modules)/
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loaders: {
                        css: ExtractText.extract({
                            fallbackLoader: "vue-style-loader",
                            loader: "css-loader?minimize&autoprefixer&-sourceMap"
                        })
                    }
                }
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.css$/,
                loader: ExtractText.extract({
                    fallbackLoader: 'style-loader?-singleton&insertAt=top',
                    loader: 'css-loader?mimize&autorepfixer&-sourceMap'
                })
            },
            {
                test: /\.(jpe?g|webp|png|svg|woff2?|ttf|eot)/,
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
            filename: "styles.css"
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
    config.plugins.push(
        new webpack.optimize.AggressiveMergingPlugin(),
        // new ImageminPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    )
} else {
    config.plugins.unshift(
        new webpack.NoErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    )
    config.entry["bundle"].unshift(
       "webpack-dev-server/client?http://localhost:3000",
       "webpack/hot/dev-server"
    )
}
