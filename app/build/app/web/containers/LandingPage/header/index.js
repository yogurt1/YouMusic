"use strict";
const React = require("react");
const styled_components_1 = require("styled-components");
const react_router_1 = require("react-router");
const Grid_1 = require("app/components/ui/Grid");
const GhostButton_1 = require("app/components/ui/GhostButton");
const menu_1 = require("./menu");
const util_1 = require("app/lib/util");
const topBarText = styled_components_1.css `
    font-size: 11pt;
    font-weight: 500;
    color: white;
`;
const TopBar = styled_components_1.default(Grid_1.Clearfix) `
    padding: 20px;
`;
const Logo = styled_components_1.default.span `
    ${topBarText}
    display: inline-block;
    float: left;
    width: 100px;
    position: relative;
    margin-left: 30px;

    &:before {
        position: absolute;
        float: left;
        display: inline-block;
        content: "";
        background-size: cover;
        background-image: url(/assets/react.svg);
        width: 30px;
        height: 30px;
        margin-left: -40px;
        margin-top: -5px;
    }
`;
const links = [
    {
        to: "/",
        name: "Home"
    },
    {
        to: "/promo",
        name: "Promo"
    },
    {
        to: "/about",
        name: "About"
    }
];
const HeaderSection = styled_components_1.default(Grid_1.Section) `
    background-color: #2b1f35;
    color: #fff;
`;
const HeroSection = styled_components_1.default(Grid_1.Section) `
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const heroText = styled_components_1.css `
    text-align: center;
    margin: 0;
`;
const HeroText = styled_components_1.default.p `
    ${heroText}
    font-size: 42pt;
    font-weight: 500;
`;
const HeroSubText = styled_components_1.default.p `
    ${heroText}
    font-size: 20pt;
    font-weight: 300;
`;
const HeaderButton = styled_components_1.default(react_router_1.Link) `
    ${GhostButton_1.ghostButton}
    position: absolute;
    left: 50%;
    bottom: 15%;
    transform: translate(-50%, 20%);
    font-size: 18pt;
    font-weight: 300;
    color: inherit;
    &:hover { color: inherit; }
`;
class Header extends React.Component {
    handleJoinClick() {
        if (util_1.getIsBrowser()) {
            alert("Try!");
        }
    }
    render() {
        return (React.createElement(HeaderSection, {height: 500}, 
            React.createElement(TopBar, null, 
                React.createElement(Logo, null, "MIRACL"), 
                React.createElement(menu_1.default, {links: links})), 
            React.createElement(HeroSection, {height: 300}, 
                React.createElement(HeroText, null, "YOU MUSIC"), 
                React.createElement(HeroSubText, null, "JUST FOR YOU")), 
            React.createElement(HeaderButton, {to: "/"}, "Join")));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Header;
//# sourceMappingURL=index.js.map