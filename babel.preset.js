const preset = buildPreset()
const nextPreset = Object.defineProperty(preset, "buildPreset", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: buildPreset
})

module.exports = nextPreset

function getEnv() {
    return process.env.NODE_ENV === "test"
        ? "test"
        : "browser"
}

function buildPreset(opts = {}) {
    const env = opts.env || getEnv()
    const browser = env === "browser"
    const node = env === "node"
    const isProduction = process.env.NODE_ENV === 'production'

    const presets = [
        // ["env", {
        //     modules: false,
        //     loose: true,
        //     targets: browser ? {
        //         "firefox": 45
        //     } : {
        //         node: "current"
        //     }
        // }],
        browser && ["es2015", {
            modules: false
        }],
        "react"
    ]

    const plugins = [
        !browser && "transform-es2015-modules-commonjs",
        ["transform-async-to-module-method", {
            module: "bluebird-co",
            method: "coroutine"
        }],
        "transform-class-properties",
        "transform-decorators-legacy",
        ["transform-runtime", {
            "helpers": true,
            "polyfill": false,
            "regenerator": true
        }],
        ["transform-object-rest-spread", {
            useBuiltIns: true
        }],
        !browser && ["system-import-transformer", {
            modules: "commonjs"
        }],
        (browser && !isProduction) && "react-hot-loader/babel"
    ]


    if (browser && isProduction) {
        presets.push(
            "babili",
            "react-optimize"
        )
        plugins.push(
            "minify-empty-function",
            "transform-remove-console",
            "transform-remove-debugger",
            "transform-node-env-inline",
            "transform-inline-environment-variables",
            "transform-react-inline-elements",
            ["babel-plugin-styled-components", {
                ssr: true,
                displayName: browser
            }]
        )
    }

    return {
        presets: presets.filter(Boolean),
        plugins: plugins.filter(Boolean)
    }
}
