import Koa from "koa"
import bodyParser from "koa-bodyparser"
import serveStatic from "koa-static"
import mount from "koa-mount"
import session from "koa-generic-session"
import compress from "koa-compress"
import convert from "koa-convert"
import {graphqlKoa, graphiqlKoa} from "graphql-server-koa"
import schema from "./data"
import config from "./config"
import passport, {router as passportRouter} from "./passport"
import renderer from "./renderer"
import {RedBoxError} from "redbox-react"
import {createElement} from "react"
import {renderToStaticMarkup} from "react-dom/server"

const compose = (...mws) => (ctx, next) => {
    const dispatch = async i => {
        const mw = mws[i] || next
        return mw(ctx, () => dispatch(i + 1))
    }
    return dispatch(0)
}

const app = new Koa()
app.keys = [config.app.secret]
app.silent = !DEV

if (DEV) {
    const logger = require("koa-logger")
    app.use(logger())
    app.use(mount("/graphiql",
        graphiqlKoa({endpointURL: "/graphql"})))
}

const staticOpts = {
    maxage: DEV ? 0 : "365d"
}

app.use(compose(
    compress(),
    mount("/assets", serveStatic("./assets", staticOpts)),
    serveStatic("./static", staticOpts),
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

app.use(async (ctx, next) => {
    try {
        await next()
    } catch(error) {
        error.status = error.statusCode || error.status || 500
        ctx.body = renderToStaticMarkup(createElement(
            RedBoxError, {error}))
    }
})

app.use(renderer)

app.on("error", err => {
    console.error(err)
})

export default app
