const getEnv = () => process.env.NODE_ENV === "test"
    ? "test" : "browser"

const buildPreset = (ctx, opts = {}) => {
    const env = opts.env || getEnv()
    const browser = env === "browser"
    const node = env === "node"
    const isProduction = process.env.NODE_ENV === 'production'
    const isTest = process.env.NODE_ENV === "test"
    const isDev = !isProduction && !isTest

    const presets = [
        browser && ["es2015", {
            modules: false,
            loose: true
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
        (browser && isDev) && "react-hot-loader/babel",
        !browser && "transform-es2015-modules-commonjs"
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

const preset = module.exports = buildPreset()

Object.defineProperty(preset, "buildPreset", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: buildPreset
})

Object.defineProperty(preset, "setup", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: env => buildPreset(null, {env})
})

Object.defineProperty(preset, "babili", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: (ctx, opts) => {
        const babili = require("babel-preset-babili")
        const resolvePlugin = p => {
            try {
                return require(`babel-plugin-${p}`)
            } catch(_) {
                return require(p)
            }
        }


        const plugins = [
            "minify-empty-function",
            "transform-remove-console",
            "transform-remove-debugger",
            "transform-node-env-inline",
            "transform-inline-environment-variables"
        ].map(resolvePlugin)

        plugins.push([
            resolvePlugin("babel-plugin-styled-components"), {
                ssr: true,
                dispayName: true
            }])

        const finalPlugins = babili.plugins.concat(plugins)
        return {
            minify: true,
            plugins: finalPlugins
        }
    }
})

