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
        const { children, onClickOutside, props } = this.props;
        return (React.createElement("span", __assign({}, props, {ref: ref => this.containerRef = ref}), children));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClickOutside;
//# sourceMappingURL=ClickOutside.js.map