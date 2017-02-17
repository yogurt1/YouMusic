"use strict";
const R = require("ramda");
const lodash_1 = require("lodash");
const recompose_1 = require("recompose");
exports.env = {
    NODE: 0x1,
    BROWSER: 0x2
};
const envTests = {
    isNode() {
    },
    isBrowser() {
    }
};
const testEnv = (envName) => {
    const formatName = R.pipe(R.toLower, lodash_1.capitalize);
    const test = R.prop(`is${formatName(envName)}`, envTests);
    return Number(test());
};
const getEnv = R.flip(R.prop)(exports.env);
const andEachByKey = R.flip((a) => R.pipe(R.map((fn) => fn()), R.reduce((a, b) => a && b, 1)));
const envMask = R.pipe(R.keys, R.map(andEachByKey([testEnv, getEnv])), R.filter(R.pipe(R.equals(0), R.not)), R.reduce(R.or, 0))(exports.env);
exports.isEnv = R.pipe(R.reduce(R.and(envMask), 0x0), Boolean);
exports.isNotEnv = R.pipe(exports.isEnv, R.not);
exports.envDecorator = (mask, not) => (component) => (not ? exports.isNotEnv : exports.isEnv)(mask)
    ? component
    : recompose_1.hoistStatics(R.always(null))(component);
//# sourceMappingURL=platform.js.map