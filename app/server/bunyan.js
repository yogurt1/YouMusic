import bunyan from "bunyan"
import config from "./config"

const logger = bunyan.createLogger({
    name: config.app.name,
    level: config.app.logLevel,
    serializers: bunyan.stdSerializers
})

export default logger
