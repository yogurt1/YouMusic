/// <reference path="config.d.ts" />
const isDev = process.env.NODE_ENV !== "production"

const {
    NODE_ENV,
    SECRET,
    PORT,
    HOST,
    LOGLEVEL,
    APP_NAME,
    WEBPACK,
    npm_lifecycle_event: TARGET
} = process.env

const isWebpack = TARGET === "dev"

const config = {
    webpack: {
        isWebpack,
        isWebpack: (
            isWebpack &&
            typeof WEBPACK === "undefined"
        ) ? true : !!(+WEBPACK)
    },
    app: {
        name: APP_NAME || "YouMusic",
        logLevel: LOGLEVEL || (isDev ? "debug" : "warn"),
        port: PORT || 3000,
        host: HOST,
        auth: {
            secret: SECRET || "keyboard cat",
            jwt: {}
        },
        session: {
            key: "ssid",
            cookie: {
                maxAge: 14 * 24 * 60 * 60 * 1000 // 2 weeks
            }
        },
    },
    db: null,
    redis: null,
    socket: null,
    graphql: null,
    api: null,
    passport: {
        google: {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackUrl: "/auth/google/callback"
        }
    }
}

module.exports = config