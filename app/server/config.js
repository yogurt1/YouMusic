const config = {
    app: {
        port: process.env.PORT || 3000,
        session: {
            secret: process.env.SECRET || "keyboard cat",
            key: "ssid",
            cookie: {
                maxAge: 14 * 24 * 60 * 60 * 1000 // 2 weeks
            }
        }
    },
    passport: {
        google: {
            clientID: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            callbackUrl: "/auth/google/callback"
        }
    }
}

export default config
