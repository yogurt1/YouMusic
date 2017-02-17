"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
const React = require("react");
const icons = require("./icons.json");
const defaults = {
    size: 14,
    icon: "\f103"
};
exports.SimpleFontAwesome = (_a) => {
    var { icon, className } = _a, props = __rest(_a, ["icon", "className"]);
    return (React.createElement("span", __assign({}, props, { className: `fa fa-${icon} ${className}` })));
};
const FontAwesome = exports.SimpleFontAwesome;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.SimpleFontAwesome;
//# sourceMappingURL=FontAwesome.js.map