const path = require("path")
const R = require("ramda")
const webpack = require("webpack")
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

const config = module.exports = {
    devtool: "cheap-module-inline-source-map",
    performance: { hints: false },
    entry: {
        "index.ios": "./app/main.ios.tsx",
        "index.android": "./app/main.android.tsx"
    },
    output: {
        path: path.resolve("./build"),
        publicPath: "/assets/",
        filename: "[name].bundle.js"
        // devtoolModuleFilenameTemplate: "/[resourcePath]"
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"],
        alias: {
            "app": path.resolve("./app")
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
                include: path.join(__dirname, "app"),
                exclude: /(node_modules|\/vendor\.js$)/,
                options: {
                    configFileName: "tsconfig.webpack.json"
                }
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: "graphql-tag/loader"
            }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            contenxt: '.',
            manifest: tryCatch(
                () => require("./build/vendor.manifest.json"),
                R.always({ name: "vendor_dll", context: {} })
            )()
        }),
        new CheckerPlugin(),
        new TsConfigPathsPlugin({
            tsconfig: "tsconfig.webpack.json",
            configFilename: "tsconfig.webpack.json",
            configFileName: "tsconfig.webpack.json",
            compiler: "typescript"
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
    const ImageminPlugin = require("imagemin-webpack-plugin").default

    config.plugins.push(
        new webpack.optimize.AggressiveMergingPlugin(),
        new ImageminPlugin(),
        new OptimizeJsPlugin(),
        new CompressionPlugin()
    )
} else {
    config.plugins.unshift(
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    )
    config.entry["app"].unshift(
        "react-hot-loader/patch",
        "webpack-hot-middleware/client?overlay=true&reload=false&quiet=true"
    )
}
