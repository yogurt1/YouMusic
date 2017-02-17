"use strict";
const React = require("react");
const styled_components_1 = require("styled-components");
const Grid_1 = require("app/components/ui/Grid");
const header_1 = require("./header");
const Fill = styled_components_1.default.div `
    background: lightblue;
    height: 100%;
`;
class LandingPage extends React.Component {
    render() {
        return (React.createElement(Grid_1.Section, null, 
            React.createElement(header_1.default, null), 
            React.createElement(Grid_1.Section, {height: "100%"}, 
                React.createElement(Fill, null)
            )));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LandingPage;
//# sourceMappingURL=index.js.map