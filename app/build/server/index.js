"use strict";
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
app.use((ctx, next) => {
    return next()
        .catch(err => {
        console.error(err);
        return Promise.reject(err);
    });
});
if (util_1.isDevEnv) {
    const devServer = require("../devServer");
    app.use(logger());
    app.use((ctx, next) => next()
        .then(() => devServer.publish({ type: devServer.types.UPDATE }))
        .catch(err => {
        ctx.type = "html";
        ctx.body = devServer.render(err);
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
    bodyParser()
]));
app
    .use(passport_1.default.initialize())
    .use(routes_1.default.routes())
    .use(routes_1.default.allowedMethods());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;
//# sourceMappingURL=index.js.map