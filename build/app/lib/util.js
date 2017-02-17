"use strict";
const lodash_1 = require("lodash");
exports.arrayBuilder = (...fns) => fns.map((fn, i) => fn(i));
exports.xor = (a, b) => !!(a ^ b);
exports.noopNull = lodash_1.constant(null);
exports.noop = lodash_1.constant(undefined);
exports.thunk = f => f;
exports.dom = (selector) => {
    const el = document.querySelector(selector);
    return (done) => el !== null && done(el);
};
exports.doms = (...selectors) => {
    const els = selectors
        .map(selector => document.querySelector(selector))
        .filter(el => el !== null);
    return (done) => els.forEach(el => done(el));
};
exports.getIsBrowser = () => process.browser ||
    typeof (window) === "object";
exports.getIsElectron = () => typeof (window) === "object" &&
    window["process"] &&
    window["process"]["versions"]["electron"];
exports.getDevEnv = () => process.env.NODE_ENV !== "production";
exports.getProdEnv = () => process.env.NODE_ENV === "production";
exports.getTestEnv = () => process.env.NODE_ENV === "test";
exports.getNotDevEnv = () => !exports.getDevEnv();
exports.getNotProdEnv = () => !exports.getProdEnv();
exports.getNotTestEnv = () => !exports.getTestEnv();
exports.getWindow = () => exports.isBrowser ? window : null;
exports.isBrowser = exports.getIsBrowser();
exports.isElectron = exports.getIsElectron();
exports.isDevEnv = exports.getDevEnv();
exports.isProdEnv = exports.getProdEnv();
exports.isTestEnv = exports.getTestEnv();
exports.isNotDevEnv = exports.getNotDevEnv();
exports.isNotProdEnv = exports.getNotProdEnv();
exports.isNotTestEnv = exports.getNotTestEnv();
exports.or = or => expr => expr || or;
exports.orTrue = expr => exports.or(true);
exports.orFalse = expr => exports.or(false);
exports.orNull = expr => exports.or(null);
exports.toString = s => Object.prototype.toString.call(s);
exports.toClass = s => /\[object\s(.*)\]/gm.exec(exports.toString(s));
exports.compose = (...fns) => data => fns.reduceRight((v, fn) => fn(v), data);
exports.flatten = arrays => arrays
    .reduce((a, b) => a.concat(b));
exports.objectValues = v => Object.keys(v)
    .map(k => v[k]);
//# sourceMappingURL=util.js.map