"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const axios_1 = require("axios");
class RequestError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.status = status;
        Error.captureStackTrace(this);
    }
}
exports.RequestError = RequestError;
class ApiClient {
    constructor(apiUrl) {
        const config = {
            baseURL: apiUrl,
            params: {},
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        };
        this.axios = axios_1.default.create(config);
    }
    request(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.axios.request(config);
            if (res.status < 200 || res.status > 401) {
                throw new RequestError(res.status, res.statusText);
            }
            return res.data;
        });
    }
}
ApiClient.methods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ApiClient;
//# sourceMappingURL=ApiClient.js.map