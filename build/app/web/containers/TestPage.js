"use strict";
const React = require("react");
const MenuWrap = ({ hidden, children }) => (React.createElement("div", { style: { display: hidden ? "none" : "block" } }, children));
class TestPage extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            open: false
        };
        this.handleClick = () => this.setState({ open: true });
    }
    render() {
        return (React.createElement("div", { id: "outer-container" },
            React.createElement("main", { id: "page-wrap" },
                React.createElement("h1", null, "Page"),
                React.createElement("button", { onClick: this.handleClick }, "Open sidebar"))));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TestPage;
//# sourceMappingURL=TestPage.js.map