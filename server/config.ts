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

const config = {
    webpack: {
        isWebpack: (
            TARGET === "dev" &&
            typeof WEBPACK === "undefined"
        ) ? true : Boolean(Number(WEBPACK))
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
    db: {
        knex: {
            client: 'sqlite',
            connection: {
                filename: './db/app.sqlite'
            }
        }
    },
    redis: {
    },
    socket: {
    },
    graphql: {
    },
    passport: {
        google: {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackUrl: "/auth/google/callback"
        }
    }
}

export default config
