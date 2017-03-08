import * as Router from "koa-router"
import * as jwt from "jsonwebtoken"
import { promisify } from "bluebird"
import passport from "../passport"
// import User from "../models/user"
import * as config from "../../config"

const jwtSign = promisify(jwt.sign) as typeof jwt.sign
const router = new Router()

router.post("/token", async ctx => {
    const { googleToken } = ctx.request.body
    const { secret, jwtOptions } = config.auth

    // const { id } = await User.findOne({ googleToken })
    const { id } = await Promise.resolve({ id: 15 })
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
