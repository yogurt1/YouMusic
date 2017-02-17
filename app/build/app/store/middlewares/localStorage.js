"use strict";
const lodash_1 = require("lodash");
const immutable_1 = require("immutable");
const localStorageMiddleware = ({ wait = 200, key = "state" }) => {
    let prevState = null;
    let isPersisting = false;
    const persistState = lodash_1.debounce(state => {
        isPersisting = true;
        if (immutable_1.is(prevState, state)) {
            prevState = state;
            localStorage.setItem(key, JSON.stringify(state));
        }
        isPersisting = false;
    }, wait);
    return ({ dispatch, getState }) => next => action => {
        persistState(getState());
        return next(action);
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = localStorageMiddleware;
//# sourceMappingURL=localStorage.js.map