require('any-promise/register/bluebird')
require('dotenv').config({ silent: true })
require('app-module-path/cwd')

const tsConfig = require('./tsconfig')
const tsNode = require('ts-node')
tsNode.register(tsConfig({ devServer: true }))

const R = require('ramda')
const chalk = require('chalk')
const Express = require('express')
const Loader = require('system-register-loader')
const ServerHotReload = require('./server/lib/ServerHotReload').default

const loader = new Loader()
const devServer = new Express()
const serverHotReload = new ServerHotReload()

serverHotReload.appGetter = getApp
serverHotReload.loader = loader

const getApp = async () => {
    const app = require('./server').default
    debugger
    return app
}

const watchApp = () => require('chokidar')
    // .watch(['./app', './server'])
    .watch(__dirname)
    .on('change', async () => {
        R.pipe(
            R.filter(R.test(/[\/\\](server|app)[\/\\]/)),
            R.forEach(id => delete require.cache[id])
        )(R.keys(require.cache))

        try {
            await getApp()
            serverHotReload.publish(
                ServerHotReload.actions.update()
            )
        } catch (err) {
            serverHotReload.publish(
                ServerHotReload.actions.error(err)
            )
        }
    })


const isDev = process.env.npm_lifecycle_event === 'dev'
const {
    WEBPACK = String(Number(isDev)),
    PORT: port = 3000,
    HOST: host = 'localhost'
} = process.env

const useWebpack = isDev && Number(WEBPACK)

if (useWebpack) {
    const HotMiddleware = require('webpack-hot-middleware')
    const DevMiddleware = require('webpack-dev-middleware')
    const webpack = require('webpack')
    const createWebpackConfig = require('./webpack.config')

    const webpackConfig = createWebpackConfig()
    const compiler = webpack(webpackConfig)
    const devMiddleware = DevMiddleware(compiler, webpackConfig.devServer)

    devServer
        .use(devMiddleware)
        .use(HotMiddleware(compiler))

    devServer.get('/__invalidate', (req, res) => {
        devMiddleware.invalidate()
        res.status(200).end()
    })
}

devServer.use(
    serverHotReload.getExpressMiddleware(getApp)
)
watchApp()

const enabledMsg = 'Webpack enabled'
const disabledMsg = 'Webpack disabled. To enable try `WEBPACK=1` or `yarn dev`'

console.log(chalk.bold.red(
    'Development mode.',
    chalk.underline(useWebpack ? enabledMsg : disabledMsg)
))

devServer.listen({ port, host }, (err) => {
    if (err) {
        console.error(chalk.bold.red.underline(err.message))
        debugger
        process.exit(1)
    }

    console.log(chalk.blue(`App listening on ${host}:${port}`))
})
