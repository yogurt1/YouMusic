"use strict";
const redux_1 = require("redux");
const util_1 = require("app/lib/util");
const react_redux_1 = require("react-redux");
exports.reduxify = (...args) => target => react_redux_1.connect(...args)(target);
const DEVTOOLS_COMPOSE_KEY = "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__";
exports.composeWithDevTools = (util_1.isBrowser && util_1.isDevEnv) &&
    window[DEVTOOLS_COMPOSE_KEY]
    ? window[DEVTOOLS_COMPOSE_KEY]
    : redux_1.compose;
exports.createTypes = (prefix, types) => types.reduce((ac, type) => (ac[type] = `${prefix}/${type}`, ac), {});
exports.createAction = (type) => (payload) => ({ type, payload });
//# sourceMappingURL=util.js.map