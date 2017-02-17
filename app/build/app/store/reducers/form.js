"use strict";
const immutable_1 = require("redux-form/immutable");
exports.FormState = immutable_1.FormState;
const auth_1 = require("../actions/auth");
exports.loginReducer = (state, action) => {
    switch (action.type) {
        case auth_1.AUTH_FAILURE: return state
            .setIn(["fields", "pasword"], void (0))
            .setIn(["values", "password"], void (0));
        default: return state;
    }
};
const reducer = immutable_1.reducer.plugin({
    login: exports.loginReducer
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = reducer;
//# sourceMappingURL=form.js.map