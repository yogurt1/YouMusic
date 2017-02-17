"use strict";
const arrayMiddleware = ({ dispatch }) => next => action => {
    if (!Array.isArray(action)) {
        return next(action);
    }
    for (const a of action) {
        dispatch(a);
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = arrayMiddleware;
//# sourceMappingURL=array.js.map