"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ApiClient_1 = require("./ApiClient");
class AuthService {
    constructor() {
        this.scope = {};
        this.client = new ApiClient_1.default("https://www.googleapis.com/oauth2/youtube");
    }
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const persistedToken = localStorage.getItem("token");
            return persistedToken;
        });
    }
    setToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    logIn(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = "";
            return token;
        });
    }
    logOut(token) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthService;
//# sourceMappingURL=AuthService.js.map