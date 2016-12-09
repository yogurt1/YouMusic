const config = {
    app: {
        port: process.env.PORT || 3000,
        secret: process.env.SECRET || "keyboard cat"
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
