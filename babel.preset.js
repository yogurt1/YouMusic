const preset = buildPreset()
const nextPreset = Object.defineProperty(preset, "buildPreset", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: buildPreset
})

module.exports = nextPreset

const getEnv = () => process.env.NODE_ENV === "test"
    ? "test"
    : "browser"

function buildPreset(opts = {}) {
    const env = opts.env || process.env.NODE_ENV === "test"
        ? "test"
        : "browser"
    const browser = env === "browser"
    const node = env === "node"
    const isProduction = process.env.NODE_ENV === 'production'

    const presets = [
        ["env", {
            modules: false,
            loose: true,
            targets: browser ? {
                "firefox": 45,
                "chrome": 55
            } : {
                node: "current"
            }
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
            "regenerator": false
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
