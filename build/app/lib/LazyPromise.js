"use strict";
const Promise = require("any-promise");
class LazyPromise {
    constructor(fn) {
        this.all = Promise.all;
        this.fn = fn;
    }
    getOrCreatePromise() {
        if (!this.promise) {
            this.promise = new Promise(this.fn);
        }
        return this.promise;
    }
    then(onFullfill, onReject) {
        return this.getOrCreatePromise()
            .then(onFullfill, onReject);
    }
    catch(onReject) {
        return this.getOrCreatePromise()
            .catch(onReject);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LazyPromise;
//# sourceMappingURL=LazyPromise.js.map