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
const jwt = require("jsonwebtoken");
const passport_1 = require("../passport");
const user_1 = require("../models/user");
const config = require("../../config");
const jwtSign = Promise.promisify(jwt.sign);
const router = new Router();
router.post("/token", (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { googleToken } = ctx.request.body;
    const { secret, jwtOptions } = config.auth;
    const { id } = yield user_1.default.findOne({ googleToken });
    const token = yield jwtSign({ id }, secret, jwtOptions);
    ctx.body = { token };
}));
router.get("/logout", (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.logout();
    ctx.body = {
        action: "logout"
    };
}));
router.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "youtube"]
}));
router.get("/google/callback", passport_1.default.authenticate("google"));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=auth.js.map