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
const Helmet = require("react-helmet");
const styled_components_1 = require("styled-components");
const transit = require("transit-immutable-js");
styled_components_1.injectGlobal `
    .__LOADER__ {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
        z-index: 9999;
        background-color: rgba(10,10,10,.8);

        & > span {
            position: absolute;
            display: block;
            margin: auto auto;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 60px;
            height: 60px;
            animation: ${styled_components_1.keyframes `
                from { transform: rotate(0deg); }
                to { transform: rotate(359deg); }
            `} .9s infinite linear;
            border-left: 6px solid rgba(0, 174, 239, .15);
            border-right: 6px solid rgba(0, 174, 239, .15);
            border-bottom: 6px solid rgba(0, 174, 239, .15);
            border-top: 6px solid rgba(0, 174, 239, .8);
            border-radius: 100%;
        }
    }
`;
const baseStyles = `
    body {
        font-size: 1.5em;
        line-height: 1.6;
        font-weight: 300;
        font-family: Roboto, HelveticaNeue, "Helvetica Neue", Helvetica, Arial, sans-serif;
        color: #222;
    }
`;
exports.ASSET_PREFIX = "/assets";
exports.assets = {
    app: {
        js: `/assets/app.bundle.js`
    },
    vendor: {
        js: `${exports.ASSET_PREFIX}/vendor.dll.js`,
        css: `${exports.ASSET_PREFIX}/vendor.dll.css`
    }
};
const Html = ({ locale, state, styles, children }) => {
    const head = Helmet.rewind();
    const attrs = head.htmlAttributes.toComponent();
    const serializedState = JSON.stringify(transit.toJSON(state));
    const script = `
        window.__PRELOADED__STATE__ = ${serializedState};
        document.getElementById("__PRELOAD_CSS__").rel = "stylesheet";
    `;
    return (React.createElement("html", __assign({}, attrs), 
        React.createElement("head", null, 
            React.createElement("title", null, "YouMusic"), 
            React.createElement("meta", {charSet: "utf-8"}), 
            React.createElement("meta", {name: "viewport", content: "width=device-width, initial-scale=1"}), 
            React.createElement("link", {id: "__PRELOAD_CSS__", rel: "preload", href: exports.assets.vendor.css}), 
            React.createElement("style", {dangerouslySetInnerHTML: { __html: baseStyles }}), 
            React.createElement("style", {className: "__CRITICAL_CSS__", dangerouslySetInnerHTML: { __html: styles }}), 
            head.title.toComponent(), 
            head.meta.toComponent(), 
            head.link.toComponent()), 
        React.createElement("body", null, 
            React.createElement("div", {className: "__LOADER__"}, 
                React.createElement("span", null)
            ), 
            React.createElement("noscript", null, 
                React.createElement("a", {href: "", style: {
                    display: "block",
                    position: "absolute",
                    color: "white",
                    textDecoration: "none",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,.75)",
                    overflow: "hidden",
                    zIndex: 9999
                }}, 
                    React.createElement("div", {style: {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        overflow: "hidden"
                    }}, 
                        React.createElement("h1", {style: {
                            textAlign: "center"
                        }}, 
                            "Enable JavaScript", 
                            React.createElement("br", null), 
                            "(click to reload)")
                    )
                ), 
                React.createElement("style", {dangerouslySetInnerHTML: { __html: `
                        .__LOADER__ { display:none; }
                    ` }})), 
            React.createElement("div", {id: "app"}, children), 
            React.createElement("script", {dangerouslySetInnerHTML: { __html: script }}), 
            React.createElement("script", {defer: true, src: exports.assets.vendor.js}), 
            React.createElement("script", {defer: true, src: exports.assets.app.js}))));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Html;
//# sourceMappingURL=Html.js.map