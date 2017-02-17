import "./vendor"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import { BrowserRouter as Router } from "react-router-dom"
import { ApolloProvider } from "react-apollo"
import { IntlProvider } from "react-intl"
import { ThemeProvider } from "styled-components"
import ServiceProvider from "./services/ServiceProvider"
import AuthService from "./services/AuthService"
import StorageService from "./services/StorageService"
import App from "./containers/App"
import { createNetworkInterface } from "apollo-client"
import { persistStore } from "redux-persist-immutable"
import * as R from "ramda"
import * as localForage from "localforage"
import configureStore from "./store"
import configureApolloClient from "./store/apollo"
import { isPlatform, isEnv, platform, env } from "./lib/platform"

const storage = localForage.config({
    driver: localForage.LOCALSTORAGE,
    name: "reduxState",
    description: "persisted redux state"
})
const persistConfig = {
    // storage,
    key: "state",
    blacklist: [
        "apollo"
    ],
    records: []
}
const theme = require("./theme.json")
const target = document.querySelector("#app")
const locale = "en"
const networkInterface = createNetworkInterface({uri: "/graphql"})
const client = configureApolloClient(networkInterface)
const store = configureStore({ client })
const persistor = persistStore(store, persistConfig)
const services = {
    authService: new AuthService(),
    storageService: new StorageService()
}

// if (isEnv(env.BROWSER)) {
if (isEnv(env.DEV)) {
    window["__APOLLO_CLIENT__"] = client
    // const { whyDidYouUpdate } = require("why-did-you-update")
    // whyDidYouUpdate(React, {
    //     exclude: /^(Connect|Form)/
    // })
}

ReactDOM.render(
    <AppContainer>
        <ApolloProvider
            client={client}
            store={store}>
            <IntlProvider locale={locale}>
                <ThemeProvider theme={theme}>
                    <ServiceProvider services={services}>
                        <Router>
                            <App />
                        </Router>
                    </ServiceProvider>
                </ThemeProvider>
            </IntlProvider>
        </ApolloProvider>
    </AppContainer>, target
)

window.onload = () => {
    // remove styled-components css, because it be force rehydrated
    R.pipe(
        R.map((selector: string) => document.querySelector(selector)),
        R.filter(R.pipe(R.isNil, R.not)),
        R.forEach((el: HTMLElement) => el.remove())
    )([
        ".__CRITICAL_CSS__",
        ".__LOADER__"
    ])
}

const { hot } = module as any
if (hot) {
    hot.accept()
}
