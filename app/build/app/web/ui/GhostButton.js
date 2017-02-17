"use strict";
const styled_components_1 = require("styled-components");
exports.ghostButton = styled_components_1.css `
    display: inline-block;
    width: 200px;
    padding: 8px;
    color: #fff;
    border: 2px solid #fff;
    text-align: center;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    transition: all .2s ease-out;

    &:hover,
    &:active {
        background-color: #fff;
        color: #000;
        transition: all .3s ease-in;
    }
`;
const GhostButton = styled_components_1.default.span `${exports.ghostButton}`;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GhostButton;
exports.wrapGhostButton = component => styled_components_1.default(component) `${exports.ghostButton}`;
//# sourceMappingURL=GhostButton.js.map