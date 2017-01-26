import * as passport from "koa-passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import User from "./models/user"
import * as config from "../config"

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

export default passport
