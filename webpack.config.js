const path = require("path")
const webpack = require("webpack")
const ExtractText = require("extract-text-webpack-plugin")
const {
    CheckerPlugin,
    TsConfigPathsPlugin
} = require("awesome-typescript-loader")

const isProduction = !!(
    "build" === process.env.npm_lifecycle_event ||
    "production" === process.env.NODE_ENV
)

const tryCatch = (t, c) => {
    try {
        return t()
    } catch (err) {
        return c(err)
    }
}

const config = {
    devtool: isProduction
        ? "inline-source-map"
        : "cheap-module-inline-source-map",
    performance: { hints: false },
    entry: {
        app: ["./app/main.web.tsx"]
    },
    output: {
        path: path.resolve("./build"),
        publicPath: "/",
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js",
        sourceMapFilename: "[file].map",
        // devtoolModuleFilenameTemplate: "/[resourcePath]"
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"],
        alias: {
            "app": path.resolve("./app"),
        },
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
        child_process: "empty",
        global: true,
        net: "mock",
        dns: "mock"
    },
    module: {
        rules: [
            {
                test: /\.(js|tsx?)$/,
                loader: "source-map-loader",
                enforce: "pre",
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "awesome-typescript-loader",
                        options: {
                            configFileName: "tsconfig.webpack.json",
                        },
                    },
                ],
                include: path.join(__dirname, "app"),
                exclude: /(node_modules|\/vendor\.js$)/,
            },
            {
                test: /\.css$/,
                loader: ExtractText.extract({
                    fallback: {
                        loader: "style-loader",
                        options: {
                            singleton: false,
                            insertAt: "top"
                        },
                    },
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true,
                                autoprefixer: true,
                                sourceMap: true
                            }
                        },
                    ],
                })
            },
            {
                test: /\.(jpe?g|webp|bmp|ico|png|svg|woff2?|ttf|eot)/,
                loader: "url-loader",
                options: {
                    limit: 10240
                }
            },
        ],
    },
    plugins: [
        // new webpack.LoaderOptionsPlugin({
        //     debug: true,
        //     sourceMap: true,
        // }),
        new webpack.DllReferencePlugin({
            contenxt: '.',
            manifest: tryCatch(
                () => require('./static/assets/vendor.manifest.json'),
                () => ({ name: "vendor_dll", content: {} })
            )
        }),
        // new webpack.IgnorePlugin(/^\.\/locale-data$/, /react-intl$/),
        new CheckerPlugin(),
        new TsConfigPathsPlugin({
            tsconfig: "tsconfig.webpack.json",
            configFileName: "tsconfig.webpack.json",
            compiler: "typescript",
        }),
        new ExtractText({
            allChunks: true,
            disable: !isProduction,
            filename: "styles.bundle.css",
        }),
        new webpack.ProvidePlugin({
            "Promise": "bluebird",
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: "development",
        }),
    ],
}

if (isProduction) {
    const OptimizeJsPlugin = require("optimize-js-plugin")
    const CompressionPlugin = require("compression-webpack-plugin")
    const ImageminPlugin = require("imagemin-webpack-plugin").default
    const BabiliPlugin = require("babili-webpack-plugin")
    const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")

    config.plugins.push(
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "vendor"
        // }),
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: "static",
            generateStatsFile: true,
            statsOptions: {
                assets: true,
                source: false,
                modules: false,
                chunks: false,
                chunkModules: false
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new ImageminPlugin(),
        new OptimizeJsPlugin(),
        new CompressionPlugin(),
        new BabiliPlugin({ sourceMap: true })
    )
} else {
    config.plugins.unshift(
        // new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    )
    // config.entry["app"].unshift(
    //     "webpack-hot-middleware/client?overlay=true&reload=false&quiet=true"
    // )
}

// TODO: Function
module.exports = config
