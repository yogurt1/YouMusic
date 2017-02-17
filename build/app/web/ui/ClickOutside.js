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
const util_1 = require("./util");
class ClickOutside extends React.Component {
    constructor() {
        super(...arguments);
        this.handleClick = ev => {
            const { onClickOutside } = this.props;
            const { containerRef } = this;
            if (!containerRef.contains(ev.target)) {
                onClickOutside(ev);
            }
        };
    }
    componentDidMount() {
        if (util_1.isBrowser) {
            document.addEventListener("click", this.handleClick, true);
        }
    }
    componentWillUnmount() {
        if (util_1.isBrowser) {
            document.removeEventListener("click", this.handleClick, true);
        }
    }
    render() {
        const _a = this.props, { children, onClickOutside } = _a, props = __rest(_a, ["children", "onClickOutside"]);
        return (React.createElement("span", __assign({}, props, { ref: ref => this.containerRef = ref }), children));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClickOutside;
//# sourceMappingURL=ClickOutside.js.map