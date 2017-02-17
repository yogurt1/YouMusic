"use strict";
const bunyan_1 = require("bunyan");
const config = require("../config");
const { name, logLevel } = config.app;
const logger = bunyan_1.createLogger({
    name,
    logLevel
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = logger;
//# sourceMappingURL=bunyan.js.map