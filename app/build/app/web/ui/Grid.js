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
const styled_components_1 = require("styled-components");
const sizes = {
    1: 4.66666666667,
    2: 13.3333333333,
    3: 22,
    4: 30.6666666667,
    5: 39.3333333333,
    6: 48,
    7: 56.6666666667,
    8: 65.3333333333,
    9: 74.0,
    10: 82.6666666667,
    11: 91.3333333333,
    12: 100
};
const breakpoints = {
    mobile: 400,
    phablet: 550,
    tablet: 750,
    desktop: 100,
    desktophd: 1200
};
const clearfix = `
    &:after {
        content: "";
        display: table;
        clear: both;
    }
`;
exports.Container = styled_components_1.default.div `
    max-width: ${p => p.wide ? "99%" : "960px"};
    position: relative;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;

    @media (min-width: 400px) {
        width: 85%;
        padding: 0;
    }

    @media (min-width: 550px) {
        width: 80%;
    }

    ${clearfix}
`;
exports.fullWidth = "width:100%;max-width:100%;";
exports.Section = styled_components_1.default(exports.Container) `
    ${exports.fullWidth}
    @media (min-width: 400px) { ${exports.fullWidth} }
    @media (min-width: 550px) { ${exports.fullWidth} }
    height: ${p => p.height || "100%"};
`;
exports.Column = styled_components_1.default.div `
    width: 100%;
    float: ${p => p.right ? "right" : "left"};
    box-sizing: border-box;

    @media (min-width: 550px) {
        margin-left: ${p => p.size === 12 ? 0 : "4%"};
        width: ${p => sizes[p.size]}%;

        &:first-child {
            margin-left: 0;
        }
    }
`;
exports.Clearfix = styled_components_1.default.div `${clearfix}`;
exports.Row = ({ children }) => React.createElement(exports.Clearfix, {
    children: children.find(child => (child.type === exports.Column && child.props.size))
        ? children
        : children.map((child, key) => React.createElement(exports.Column, {
            key,
            children: child,
            size: 12 / children.length
        }))
});
exports.Col = exports.Column;
exports.Flex = styled_components_1.default.div `
    display: flex;
    flex-direction: ${p => p.vertical ? "column" : "row"};
`;
exports.getColumnBySize = size => props => React.createElement(exports.Column, __assign({size: size}, props));
//# sourceMappingURL=Grid.js.map