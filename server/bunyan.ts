import { createLogger } from "bunyan"
import config from "../config"

const logger = createLogger({
    name: config.app.name,
    level: config.app.logLevel,
    serializers: bunyan.stdSerializers
})

export default logger
