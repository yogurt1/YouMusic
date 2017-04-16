import * as passport from "koa-passport"
import User from "./models/user"
import config from "./config"

const { Strategy: GoogleStrategy } = require("passport-google-oauth20")

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

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            if (!user) {
                throw new Error("User not found")
            }

            done(null, user)
        })
        .catch(done)
})

export default passport
