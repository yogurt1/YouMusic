import * as Router from "koa-router"
import auth from "./auth"

const router = new Router()

router.use("/auth",
           auth.routes(),
           auth.allowedMethods())

router.get("/", async ctx => {
    ctx.body = {
        message: "Hello, world!"
    }
})

export default auth
