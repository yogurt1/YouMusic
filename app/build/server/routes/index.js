"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Router = require("koa-router");
const graphql_server_koa_1 = require("graphql-server-koa");
const schema_1 = require("../data/schema");
const auth_1 = require("./auth");
const frontend_1 = require("../middlewares/frontend");
const util_1 = require("app/lib/util");
const router = new Router();
router.all("/graphql", graphql_server_koa_1.graphqlKoa(ctx => ({
    schema: schema_1.default,
    context: ctx
})));
if (util_1.isDevEnv) {
    router.all("/graphiql", graphql_server_koa_1.graphiqlKoa({ endpointURL: "/graphql" }));
}
router.use("/auth", auth_1.default.routes(), auth_1.default.allowedMethods());
router.get("/random", (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = Math.random() * 10000 | 0;
}));
router.get("/api", (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = {
        message: "Hello, world!"
    };
}));
router.all("/", frontend_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=index.js.map