"use strict";
exports.types = {};
exports.ConditionalError = function (err) {
    const { type = err.message } = err;
    switch (type) {
        default: throw err;
    }
};
class RequestError extends Error {
    constructor(status, statusText) {
        super(statusText);
        this.status = status;
        Error.captureStackTrace(this);
    }
}
exports.RequestError = RequestError;
//# sourceMappingURL=errors.js.map