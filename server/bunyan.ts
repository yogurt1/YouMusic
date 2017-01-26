import { stdSerializers, createLogger } from "bunyan"
import * as config from "../config"

const { name, logLevel } = config.app

const logger = createLogger({
    name,
    logLevel,
    serializers: stdSerializers
})

export default logger
