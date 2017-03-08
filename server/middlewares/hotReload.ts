import { Middleware } from "koa"

export default (): Middleware => async (ctx, next) => {
    const { __devServer: devServer } = ctx as any
    try {
        await next()
        devServer.publishUpdate()
    } catch (error) {
        ctx.type = "html"
        ctx.body = devServer.tmpl({ error })
    }
}
