"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const React = require("react");
const hoist_non_react_statics_1 = require("hoist-non-react-statics");
const recompose_1 = require("recompose");
const ramda_1 = require('ramda');
const util_1 = require("./util");
exports.browserOnly = fallback => util_1.isBrowser ? util_1.thunk
    : () => (fallback || util_1.noopNull);
exports.lazyLoad = (...importees) => WrappedComponent => hoist_non_react_statics_1.default((LazyLoad_1 = class LazyLoad extends React.Component {
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
            const { children, };
        }
    },
    LazyLoad_1.WrappedComponent = WrappedComponent,
    LazyLoad_1.displayName = recompose_1.wrapDisplayName(WrappedComponent, 'LazyLoad'),
    LazyLoad_1), ...props);
this.props;
if (!modules) {
    return null;
}
return React.createElement(WrappedComponent, {
    modules, }, ...props, , children);
WrappedComponent;
exports.LazyLoad = ({ children, modules }) => exports.lazyLoad(...modules)(children);
exports.renderThen = (promise) => WrappedComponent => hoist_non_react_statics_1.default((classExpression_1 = class extends React.Component {
        constructor() {
            super(...arguments);
            this.state = { resolved: null };
        }
        componentDidMount() {
            promise.then(resolved => this.setState({ resolved }));
        }
        render() {
            const { resolved } = this.state;
            return !resolved ? null : (React.createElement(WrappedComponent, __assign({resolved: resolved}, this.props)));
        }
    },
    classExpression_1.WrappedComponent = WrappedComponent,
    classExpression_1.displayName = recompose_1.wrapDisplayName(WrappedComponent, 'ThenCatch'),
    classExpression_1), WrappedComponent);
exports.shouldntUpdate = recompose_1.shouldUpdate(ramda_1.F);
//# sourceMappingURL=decorators.js.map