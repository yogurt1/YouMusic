"use strict";
const util_1 = require("./util");
const voids = [];
class FakeWindow {
    constructor(ctx) {
        voids.forEach(k => this[k] = void (null));
    }
}
exports.FakeWindow = FakeWindow;
function getWindow(ctx) {
    if (util_1.isBrowser) {
        return window;
    }
    return new FakeWindow(ctx);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getWindow;
//# sourceMappingURL=DocumentProvider.js.map