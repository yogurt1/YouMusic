import * as passport from "koa-passport"
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import * as Router from "koa-router"
import User from "./models/user"
import config from "./config"
const router = new Router()

// passport.use(new GoogleStrategy(config.passport.google,
//     async (accessToken, refreshToken, profile, done) => {
//         try {
//             const user = await User.findOrCreate({googleId: profile.id})
//             done(null, user)
//         } catch(err) {
//             done(err, null)
//         }
//     }
// ))

router.get("/", ctx => ctx.body = "<h1>auth router</h1>")

router.get("/logout", async ctx => {
    ctx.logout()
    ctx.body = {
        action: "logout"
    }
})

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "youtube"]
}))

router.get("/google/callback",
    passport.authenticate("google", {failureRedirect: "/login"}),
    async ctx => {
        ctx.redirect("/")
    })

export {router}
export default passport
