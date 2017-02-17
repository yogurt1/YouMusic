"use strict";
require("./vendor");
const React = require("react");
const ReactDOM = require("react-dom");
const react_hot_loader_1 = require("react-hot-loader");
const react_router_dom_1 = require("react-router-dom");
const react_apollo_1 = require("react-apollo");
const react_intl_1 = require("react-intl");
const styled_components_1 = require("styled-components");
const ServiceProvider_1 = require("./services/ServiceProvider");
const AuthService_1 = require("./services/AuthService");
const StorageService_1 = require("./services/StorageService");
const App_1 = require("./containers/App");
const apollo_client_1 = require("apollo-client");
const redux_persist_immutable_1 = require("redux-persist-immutable");
const R = require("ramda");
const localForage = require("localforage");
const store_1 = require("./store");
const apollo_1 = require("./store/apollo");
const platform_1 = require("./lib/platform");
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
const services = {
    authService: new AuthService_1.default(),
    storageService: new StorageService_1.default()
};
if (platform_1.isEnv(platform_1.env.DEV)) {
    window["__APOLLO_CLIENT__"] = client;
}
ReactDOM.render(React.createElement(react_hot_loader_1.AppContainer, null,
    React.createElement(react_apollo_1.ApolloProvider, { client: client, store: store },
        React.createElement(react_intl_1.IntlProvider, { locale: locale },
            React.createElement(styled_components_1.ThemeProvider, { theme: theme },
                React.createElement(ServiceProvider_1.default, { services: services },
                    React.createElement(react_router_dom_1.BrowserRouter, null,
                        React.createElement(App_1.default, null))))))), target);
window.onload = () => {
    R.pipe(R.map((selector) => document.querySelector(selector)), R.filter(R.pipe(R.isNil, R.not)), R.forEach((el) => el.remove()))([
        ".__CRITICAL_CSS__",
        ".__LOADER__"
    ]);
};
const { hot } = module;
if (hot) {
    hot.accept();
}
//# sourceMappingURL=main.web.js.map