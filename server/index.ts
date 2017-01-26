import * as Koa from "koa"
import * as bodyParser from "koa-bodyparser"
import * as serveStatic from "koa-static"
import * as conditional from "koa-conditional-get"
import * as etag from "koa-etag"
import * as compress from "koa-compress"
import * as logger from "koa-logger"
import * as ms from "ms"
import { graphqlKoa, graphiqlKoa } from "graphql-server-koa"
import compose from "./compose"
import passport from "./passport"
import routes from "./routes"
import bunyayn from "./bunyan"
import cache from "./middlewares/cache"
import frontend from "./middlewares/frontend"
import * as config from "../config"
import { isDevEnv, isNotDevEnv } from "app/lib/util"

const app = new Koa()
app.keys = [ config.app.session.secret ]
app.silent = isNotDevEnv
// app.name = config.app.name

app.use((ctx, next) => next()
    .catch(err => {
        console.error(err)
        throw err
    }))

if (isDevEnv) {
    const devServer = require("../devServer")

    app.use(logger())
    app.use((ctx, next) => next()
        .then(() => devServer.publish({ type: devServer.types.UPDATE }))
        .catch(err => {
            ctx.type = "html"
            ctx.body = devServer.tmpl(err)
        }))
} else {
    app.use(cache())
}

app.use(compose(
    conditional(),
    etag(),
    compress(),
    serveStatic("./static", {
        maxage: isNotDevEnv ? ms("1y") : 0
    }),
    bodyParser(),
    passport.initialize(),
    routes.routes(),
    routes.allowedMethods()
))

export default app
