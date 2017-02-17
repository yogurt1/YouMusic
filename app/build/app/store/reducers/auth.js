"use strict";
const immutable_1 = require("immutable");
const auth_1 = require("../actions/auth");
exports.initialState = immutable_1.Map({
    token: null
});
const reducer = (state = exports.initialState, action) => {
    switch (action.type) {
        case auth_1.SET_TOKEN: return state
            .set("token", action.payload);
        default: return state;
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = reducer;
//# sourceMappingURL=auth.js.map