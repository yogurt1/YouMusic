import * as Router from "koa-router"
import { graphqlKoa, graphiqlKoa } from "graphql-server-koa"
import schema from "../data/schema"
import auth from "./auth"
import frontend from "../middlewares/frontend"
import { isDevEnv } from "app/lib/util"

const router = new Router()

router.all("/graphql", graphqlKoa(ctx => ({
    schema,
    context: ctx
})))

if (isDevEnv) {
    router.all("/graphiql",
        graphiqlKoa({ endpointURL: "/graphql" }))
}


router.use("/auth",
           auth.routes(),
           auth.allowedMethods())

router.get("/random", async ctx => {
    ctx.body = Math.random() * 10000 | 0
})

router.get("/api", async ctx => {
    ctx.body = {
        message: "Hello, world!"
    }
})

router.all("/", frontend)

export default router
