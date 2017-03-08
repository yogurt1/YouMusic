import "isomorphic-fetch"
import * as Koa from "koa"
import * as bodyParser from "koa-bodyparser"
import * as serveStatic from "koa-static"
import * as conditional from "koa-conditional-get"
import * as etag from "koa-etag"
import * as compress from "koa-compress"
import * as logger from "koa-logger"
import * as injectLocale from "koa-locale"
import * as compose from "koa-compose"
import * as ms from "ms"
import { graphqlKoa, graphiqlKoa } from "graphql-server-koa"
import passport from "./passport"
import routes from "./routes"
import bunyayn from "./bunyan"
import cache from "./middlewares/cache"
import hotReload from "./middlewares/hotReload"
import frontend from "./middlewares/frontend"
import platform from "app/lib/platform"
import * as config from "../config"

const app = new Koa()
app.keys = [ config.app.session.secret ]
app.silent = !platform.isDev
// app.name = config.app.name
injectLocale(app)

// app.use(error())

if (platform.isDev) {
    app
        .use(logger())
        .use(hotReload())
} else {
    app.use(cache())
}


app
    .use(conditional())
    .use(etag())
    .use(compress())
    .use(serveStatic("./build", {
        maxage: platform.isProd ? ms("1y") : 0
    }))
    .use(bodyParser())
    .use(passport.initialize())
    .use(routes.routes())
    .use(routes.allowedMethods())

export default app
