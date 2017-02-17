"use strict";
const React = require("react");
const styled_components_1 = require("styled-components");
const react_router_1 = require("react-router");
const FontAwesome_1 = require("app/components/ui/FontAwesome");
const AppSidebar = styled_components_1.default.div `
    height: 100vh;
    width: 240px;
    position: absolute;
    padding-top: 56px;
    transition: transform .3s ease-out;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.45);
    // box-shadow:
    //     3px 0 10px 0 rgba(255,255,255,0)
    //     inset 0 4px 0 rgba(255,255,255,0);
    background-color: #ffe;

    ${p => !p.open && styled_components_1.css `
        transform: translate3d(-100%, 0, 0);
    `}
`;
const AppMenu = styled_components_1.default.div `
    padding: 15px;
    display: flex;
    flex-direction: column;
    jusitfy-content: space-around;
`;
const AppMenuItem = styled_components_1.default.div `
    text-align: center;
    padding: 4px;
`;
const AppMenuLink = styled_components_1.default(react_router_1.Link) `
    display: block;
    color: black;

    &:hover,
    &:focus,
    &.active {
        color: white;
        border-radius: 14px;
        background: rgba(7, 4, 239, 1);
        font-weight: 500;
        text-decoration: none;
    }
`;
class Sidebar extends React.PureComponent {
    render() {
        return (React.createElement(AppSidebar, { open: this.props.open },
            React.createElement(AppMenu, null, this.props.menuItems.map((item, i) => (React.createElement(AppMenuItem, { key: i },
                React.createElement(AppMenuLink, { activeClassName: "active", to: item.path },
                    React.createElement(FontAwesome_1.default, { icon: item.icon }),
                    item.name)))))));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Sidebar;
//# sourceMappingURL=sidebar.js.map