"use strict";
const React = require("react");
const styled_components_1 = require("styled-components");
const react_router_1 = require("react-router");
const react_media_1 = require("react-media");
const Grid_1 = require("app/components/ui/Grid");
const MenuWrapper = styled_components_1.default.div `float:right;`;
const MenuItem = styled_components_1.default(react_router_1.Link) `
    padding: 5px;
    display: block;
    font-size: 11pt;
    color: white;
    text-decoration: none;
`;
const DropdownMenu = () => null;
const Menu = ({ links }) => (React.createElement(MenuWrapper, null, 
    React.createElement(react_media_1.default, {query: { maxWidth: "764px" }}, m => m ? (React.createElement(DropdownMenu, {links: links})) : (React.createElement(Grid_1.Flex, null, links.map((link, key) => (React.createElement(MenuItem, {key: key, to: link.to}, link.name))))))
));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Menu;
//# sourceMappingURL=menu.js.map