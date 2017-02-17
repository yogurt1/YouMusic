"use strict";
const routing_1 = require("./routing");
const form_1 = require("./form");
const auth_1 = require("./auth");
const config_1 = require("../ducks/config");
const video_1 = require("../ducks/video");
exports.records = [];
const reducersRegistry = {
    routing: routing_1.default,
    form: form_1.default,
    auth: auth_1.default,
    config: config_1.reducer,
    video: video_1.reducer
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = reducersRegistry;
//# sourceMappingURL=index.js.map