"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const redux_actions_1 = require("redux-actions");
exports.SET_TOKEN = "SET_TOKEN";
exports.RESET_TOKEN = "RESET_TOKEN";
exports.REFRESH_TOKEN = "REFRESH_TOKEN";
exports.CLEAR_TOKEN = "CLEAR_TOKEN";
exports.AUTH_FAILURE = "AUTH_FAILURE";
exports.LOGIN = "LOGIN";
exports.setToken = redux_actions_1.createAction(exports.SET_TOKEN);
exports.login = redux_actions_1.createAction(exports.LOGIN);
exports.authFailure = redux_actions_1.createAction(exports.AUTH_FAILURE);
const fakeToken = () => "random token";
exports.logIn = body => (dispatch) => __awaiter(this, void 0, void 0, function* () {
    const authService = new AuthService();
    const { username, password } = body;
    authService.logIn(username, password);
    try {
        const token = yield fakeToken();
        dispatch(loginSuccess(token));
    }
    catch (err) {
        dispatch(loginFailure(err));
    }
});
//# sourceMappingURL=auth.js.map