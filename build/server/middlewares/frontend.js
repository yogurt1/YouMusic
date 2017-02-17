"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const React = require("react");
const ReactDOM = require("react-dom/server");
const Html_1 = require("app/Html");
const Root_1 = require("app/Root");
const react_router_dom_1 = require("react-router-dom");
const react_apollo_1 = require("react-apollo");
const react_intl_1 = require("react-intl");
const styled_components_1 = require("styled-components");
const server_1 = require("react-apollo/server");
const apollo_client_1 = require("apollo-client");
const styleSheet = require("styled-components/lib/models/StyleSheet");
const store_1 = require("app/store");
const apollo_1 = require("app/store/apollo");
const config = require("../../config");
const theme = require("app/theme.json");
const render = node => `
    <!doctype html>
    ${ReactDOM.renderToString(node)}
`;
const frontendMiddleware = (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.type = "html";
    if (config.webpack.isWebpack) {
        ctx.body = render(React.createElement(Html_1.default, null));
        return;
    }
    const locale = ctx.request.getLocaleFromHeader() || "en";
    const location = ctx.request.url;
    const networkInterface = apollo_client_1.createNetworkInterface({
        uri: ctx.request.host,
        opts: {
            credentials: "same-origin",
            headers: ctx.request.headers
        }
    });
    const client = apollo_1.default(networkInterface);
    const store = store_1.default({ client });
    const context = {};
    ctx.state = __assign({}, ctx.state, { routingContext: context });
    const componentTree = (React.createElement(react_apollo_1.ApolloProvider, { client: client, store: store },
        React.createElement(react_intl_1.IntlProvider, { locale: locale },
            React.createElement(styled_components_1.ThemeProvider, { theme: theme },
                React.createElement(react_router_dom_1.StaticRouter, { location: location, context: context },
                    React.createElement(Root_1.default, null))))));
    if (context.url) {
        ctx.redirect(context.url);
        return;
    }
    yield server_1.getDataFromTree(componentTree);
    const state = store.getState();
    const styles = styleSheet.rules()
        .map(r => r.cssText).join("");
    ctx.body = render(React.createElement(Html_1.default, { styles: styles, state: state }, componentTree));
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = frontendMiddleware;
//# sourceMappingURL=frontend.js.map