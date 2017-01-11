const webpackConfig = require("./webpack.config")

webpackConfig.target = "electron"

module.exports = webpackConfig

