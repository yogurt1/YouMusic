// import "react-hot-loader/patch"
import "./vendor"
import * as React from "react"
import * as ReactDOM from "react-dom"
import * as R from "ramda"
import * as transit from "transit-immutable-js"
import {
    INDEXEDDB as IndexedDBStorageDriver
} from "localforage"
import { Router } from "react-router"
// import { AppContainer } from "react-hot-loader"
import { ApolloProvider } from "react-apollo"
import { IntlProvider } from "react-intl"
import { ThemeProvider } from "styled-components"
import App from "./containers/App"
import ServiceProvider from "./services/ServiceProvider"
import AuthService from "./services/AuthService"
import StorageService from "./services/StorageService"
import createHistory from "history/createBrowserHistory"
import { createNetworkInterface } from "apollo-client"
import { persistStore } from "redux-persist-immutable"
import configureStore from "./store"
import configureApolloClient from "./store/apollo"
import configureStorage from "./lib/configureStorage"
import {
    TARGET_SELECTOR,
    CRITICAL_CSS_SELECTOR,
    LOADER_SELECTOR,
    INITIAL_STATE_KEY,
    STORAGE_STATE_KEY,
    APOLLO_CLIENT_KEY,
    APOLLO_STATE_KEY,
    DEFAULT_LOCALE
} from "./lib/constants"
import platform from "./lib/platform"
import theme from "./theme"

const AppContainer = ({ children }) => children
const locale = (
    navigator.language ||
    DEFAULT_LOCALE
)
const preloadedState = JSON.parse(window[INITIAL_STATE_KEY] || "null")
const initialState = preloadedState
    ? transit.fromJSON(preloadedState)
    : undefined
const storage = configureStorage(IndexedDBStorageDriver)
const history = createHistory()
const client = configureApolloClient(
    createNetworkInterface({
        uri: "/graphql"
    })
)
const store = configureStore({
    client,
    history,
    initialState,
})
const persistor = persistStore(store, {
    storage,
    key: STORAGE_STATE_KEY,
    blacklist: [APOLLO_STATE_KEY],
    records: [],
})
const services = {
    authService: new AuthService(),
    storageService: new StorageService()
}

if (platform.isDev) {
    // inject client to window for devtools
    window[APOLLO_CLIENT_KEY] = client
}

const renderApp = (A) => ReactDOM.render(
    <AppContainer>
        <ApolloProvider client={client} store={store}>
            <IntlProvider locale={locale}>
                <ThemeProvider theme={theme}>
                    <ServiceProvider services={services}>
                        <Router history={history}>
                            <A />
                        </Router>
                    </ServiceProvider>
                </ThemeProvider>
            </IntlProvider>
        </ApolloProvider>
    </AppContainer>,
    document.getElementById(TARGET_SELECTOR)
)


window.onload = () => {
    renderApp(App)
    document
        .getElementById(LOADER_SELECTOR)
        .remove()
    const criticalCss = document
        .getElementById(CRITICAL_CSS_SELECTOR)
    criticalCss.addEventListener("load", () => {
        criticalCss.remove()
    })
}

const { hot } = module as any
if (hot) {
    hot.accept("./containers/App", () => {
        renderApp(App)
    })
}
