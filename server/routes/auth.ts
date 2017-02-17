import * as Router from "koa-router"
import * as jwt from "jsonwebtoken"
import passport from "../passport"
import User from "../models/user"
import * as config from "../../config"

const jwtSign = Promise.promisify(jwt.sign)
const router = new Router()

router.post("/token", async ctx => {
    const { googleToken } = ctx.request.body
    const { secret, jwtOptions } = config.auth

    const { id } = await User.findOne({ googleToken })
    const token = await jwtSign({ id }, secret, jwtOptions)

    ctx.body = { token }
})

router.get("/logout", async ctx => {
    ctx.logout()
    ctx.body = {
        action: "logout"
    }
})

router.get("/google", passport.authenticate("google", {
    scope: [ "profile", "youtube" ]
}))

router.get("/google/callback", passport.authenticate("google"))

export default router
