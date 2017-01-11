declare const DEV: string

import * as fs from "fs"
import * as Koa from "koa"
import * as bodyParser from "koa-bodyparser"
import * as serveStatic from "koa-static"
import * as mount from "koa-mount"
import * as conditional from "koa-conditional-get"
import * as etag from "koa-etag"
import * as session from "koa-generic-session"
import * as compress from "koa-compress"
import * as convert from "koa-convert"
import { graphqlKoa, graphiqlKoa } from "graphql-server-koa"
import schema from "./data"
import passport, { router as passportRouter } from "./passport"
import cache from "./cache"
// import { bunyan } from "./bunyan"
import renderer from "./renderer"
import * as config from "../config"

const compose = (...mws: Koa.Middleware[]) => (ctx, next) => {
    const dispatch = async i => {
        const mw = mws[i] || next
        return mw(ctx, () => dispatch(i + 1))
    }
    return dispatch(0)
}

const app = new Koa()
app.keys = [config.app.session.secret]
app.silent = !DEV
// app.name = config.app.name

if (DEV) {
    const logger = require("koa-logger")
    const devServer = require("../devServer")

    app.use(logger())
    app.use(mount("/graphiql",
        graphiqlKoa({endpointURL: "/graphql"})))

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
        maxage: DEV ? 0 : 365 * 24 * 60 * 60
    }),
    bodyParser(),
    convert(session(config.app.session)),
    convert(passport.initialize()),
    convert(passport.session())
))

app.use(mount("/auth", compose(
    passportRouter.routes(),
    passportRouter.allowedMethods()
)))

app.use(mount("/graphql", graphqlKoa(ctx => {
    return {
        schema,
        pretty: DEV,
        context: ctx
    }
})))

app.use(renderer)

// app.use((ctx, next) => {
//     ctx.type = "html"
//     ctx.body = fs.createReadStream("./app/index.html")
// })

app.on("error", err => null)

export default app
