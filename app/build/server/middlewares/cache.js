"use strict";
const LRU = require("lru-cache");
const cash = require("koa-cash");
const convert = require("koa-convert");
const cache = LRU({
    maxAge: 30000
});
const middleware = () => convert(cash({
    get(key, maxAge) {
        return cache.get(key);
    },
    set(key, value) {
        cache.set(key, value);
    }
}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = middleware;
//# sourceMappingURL=cache.js.map