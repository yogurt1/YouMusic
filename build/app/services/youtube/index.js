"use strict";
const ApiClient_1 = require("../ApiClient");
const config = require("../../config");
var search_1 = require("./search");
exports.YouTubeSearchService = search_1.default;
class YouTubeService extends ApiClient_1.default {
    constructor(apiKey) {
        super(config.youtube.API_URL);
        this.headers = this.axios.defaults.headers;
        this.params = this.axios.defaults.params;
        this.setParam({
            key: apiKey || config.youtube.API_KEY
        });
    }
    forOwnEntries(obj, done) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                done(key, obj[key]);
            }
        }
    }
    setParam(key, val) {
        if (typeof (key) === "object") {
            this.forOwnEntries(key, (k, v) => this.params[k] = v);
        }
        else {
            this.params[key] = val;
        }
        return this;
    }
    setHeader(key, val) {
        if (typeof (key) === "object") {
            this.forOwnEntries(key, (k, v) => this.headers[k] = v);
        }
        else {
            this.params[key] = val;
        }
        return this;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = YouTubeService;
//# sourceMappingURL=index.js.map