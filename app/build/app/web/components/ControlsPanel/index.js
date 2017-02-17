"use strict";
const React = require("react");
const styled_components_1 = require("styled-components");
const Panel = styled_components_1.default.div `
    position: absolute;
    background: white;
    color: black;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
    bottom: 0;
    left: 0;
    right: 0;
    height: 70px;
    width: 100%;

    & span { font-size: 36px; }
`;
class ControlsPanel extends React.Component {
    render() {
        return (React.createElement(Panel, null, 
            React.createElement("span", null, "PLACEHOLDER"), 
            React.createElement("h1", null, "WTF")));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ControlsPanel;
//# sourceMappingURL=index.js.map