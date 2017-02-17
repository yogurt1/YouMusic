"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const serveStatic = require("koa-static");
const conditional = require("koa-conditional-get");
const etag = require("koa-etag");
const compress = require("koa-compress");
const logger = require("koa-logger");
const locale = require("koa-locale");
const compose = require("koa-compose");
const ms = require("ms");
const passport_1 = require("./passport");
const routes_1 = require("./routes");
const cache_1 = require("./middlewares/cache");
const config = require("../config");
const util_1 = require("app/lib/util");
const app = new Koa();
app.keys = [config.app.session.secret];
app.silent = util_1.isNotDevEnv;
locale(app);
if (util_1.isDevEnv) {
    app.use(logger());
    app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
        const { __devServer } = ctx;
        try {
            yield next();
            __devServer.publishUpdate();
        }
        catch (err) {
            ctx.type = "html";
            ctx.body = __devServer.render(err);
        }
    }));
}
else {
    app.use(cache_1.default());
}
app.use(compose([
    conditional(),
    etag(),
    compress(),
    serveStatic("./build", {
        maxage: util_1.isNotDevEnv ? ms("1y") : 0
    }),
    bodyParser(),
    passport_1.default.initialize(),
    routes_1.default.routes(),
    routes_1.default.allowedMethods()
]));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;
//# sourceMappingURL=index.js.map