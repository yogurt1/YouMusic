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
const hoist_non_react_statics_1 = require("hoist-non-react-statics");
const recompose_1 = require("recompose");
const ramda_1 = require("ramda");
const util_1 = require("./util");
exports.browserOnly = fallback => util_1.isBrowser ? util_1.thunk
    : () => (fallback || util_1.noopNull);
exports.lazyLoad = (...importees) => WrappedComponent => {
    return hoist_non_react_statics_1.default((_a = class LazyLoad extends React.Component {
            constructor() {
                super(...arguments);
                this.state = { modules: null };
            }
            shouldComponentUpdate(_, nextState) {
                return true;
            }
            componentWillMount() {
                Promise.all(importees)
                    .then(modules => this.setState({ modules }));
            }
            render() {
                const { modules } = this.state;
                const _a = this.props, { children } = _a, props = __rest(_a, ["children"]);
                if (!modules) {
                    return null;
                }
                return React.createElement(WrappedComponent, __assign({ modules }, props), children);
            }
        },
        _a.WrappedComponent = WrappedComponent,
        _a.displayName = recompose_1.wrapDisplayName(WrappedComponent, 'LazyLoad'),
        _a), WrappedComponent);
    var _a;
};
exports.LazyLoad = ({ children, modules }) => exports.lazyLoad(...modules)(children);
exports.renderThen = (promise) => WrappedComponent => {
    return hoist_non_react_statics_1.default((_a = class extends React.Component {
            constructor() {
                super(...arguments);
                this.state = { resolved: null };
            }
            componentDidMount() {
                promise.then(resolved => this.setState({ resolved }));
            }
            render() {
                const { resolved } = this.state;
                return !resolved ? null : (React.createElement(WrappedComponent, __assign({ resolved: resolved }, this.props)));
            }
        },
        _a.WrappedComponent = WrappedComponent,
        _a.displayName = recompose_1.wrapDisplayName(WrappedComponent, 'ThenCatch'),
        _a), WrappedComponent);
    var _a;
};
exports.shouldntUpdate = recompose_1.shouldUpdate(ramda_1.F);
//# sourceMappingURL=decorators.js.map