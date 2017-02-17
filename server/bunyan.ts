import { createLogger } from "bunyan"
import * as config from "../config"

const { name, logLevel } = config.app

const logger = createLogger({
    name,
    logLevel
})

export default logger
