"use strict";
require("./vendor");
const React = require("react");
const ReactDOM = require("react-dom");
const react_hot_loader_1 = require("react-hot-loader");
const react_router_dom_1 = require("react-router-dom");
const react_apollo_1 = require("react-apollo");
const react_intl_1 = require("react-intl");
const styled_components_1 = require("styled-components");
const app_1 = require("./app");
const apollo_client_1 = require("apollo-client");
const redux_persist_immutable_1 = require("redux-persist-immutable");
const localForage = require("localforage");
const store_1 = require("app/store");
const apollo_1 = require("app/store/apollo");
const util_1 = require("app/lib/util");
const storage = localForage.config({
    driver: localForage.LOCALSTORAGE,
    name: "reduxState",
    description: "persisted redux state"
});
const persistConfig = {
    key: "state",
    blacklist: [
        "apollo"
    ],
    records: []
};
const theme = require("./theme.json");
const target = document.querySelector("#app");
const locale = "en";
const networkInterface = apollo_client_1.createNetworkInterface({ uri: "/graphql" });
const client = apollo_1.default(networkInterface);
const store = store_1.default({ client });
const persistor = redux_persist_immutable_1.persistStore(store, persistConfig);
if (util_1.isDevEnv) {
    window["__APOLLO_CLIENT__"] = client;
}
const Root = () => (React.createElement(react_hot_loader_1.AppContainer, null, 
    React.createElement(react_apollo_1.ApolloProvider, {client: client, store: store}, 
        React.createElement(react_intl_1.IntlProvider, {locale: locale}, 
            React.createElement(styled_components_1.ThemeProvider, {theme: theme}, 
                React.createElement(react_router_dom_1.BrowserRouter, null, 
                    React.createElement(app_1.default, null)
                )
            )
        )
    )
));
ReactDOM.render(React.createElement(Root, null), target);
window.onload = () => {
    util_1.doms(".__CRITICAL_CSS__", ".__LOADER__")(el => el.remove());
};
const { hot } = module;
if (hot) {
    hot.accept();
}
//# sourceMappingURL=index.js.map