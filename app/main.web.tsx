// import "react-hot-loader/patch"
import "./vendor"
import * as React from "react"
import * as ReactDOM from "react-dom"
import * as transit from "transit-immutable-js"
import { Router } from "react-router"
import { AppContainer } from "react-hot-loader"
import { ApolloProvider } from "react-apollo"
import { IntlProvider } from "react-intl"
import { ThemeProvider } from "styled-components"
import App from "./containers/App"
import { createNetworkInterface } from "apollo-client"
import { persistStore } from "redux-persist-immutable"
import createHistory from 'history/createBrowserHistory'
import configureStore, { State } from './store'
import configureApolloClient from './store/apollo'
import configureStorage from './lib/configureStorage'
import * as constants from './lib/constants'
import platform from './lib/platform'
import theme from './theme'

const locale = (
    navigator.language ||
    constants.DEFAULT_LOCALE
)

const initialState: State | void = (() => {
    try {
        const { [constants.INITIAL_STATE_KEY]: json } = window

        if (typeof json !== 'object') {
            return undefined
        }

        return transit.fromJSON(JSON.parse(json))
    } catch (err) {
        return undefined
    }
})()

const storage = configureStorage({
    target: 'browser'
})
const history = createHistory()
const client = configureApolloClient(
    createNetworkInterface({
        uri: constants.GRAPHQL_ENDPOINT
    })
)
const store = configureStore({
    client,
    history,
    locale,
    initialState,
})

const renderApp = (AppComponent) => {
    const node = document.getElementById(constants.TARGET_SELECTOR)
    const tree = (
        <AppContainer>
            <ApolloProvider client={client} store={store}>
                <IntlProvider locale={locale}>
                    <ThemeProvider theme={theme}>
                        <Router history={history}>
                            <AppComponent />
                        </Router>
                    </ThemeProvider>
                </IntlProvider>
            </ApolloProvider>
        </AppContainer>
    )

    ReactDOM.render(tree, node)
}

window.onload = async () => {
    const persistor = await new Promise(
        (resolve, reject) => {
            const opts = {
                storage,
                key: constants.STORAGE_STATE_KEY,
                blacklist: [constants.APOLLO_STATE_KEY],
                records: [],
            }
            const callback = () => {
                resolve(persistor)
            }

            const persistor = persistStore(store, opts, callback)
        }
    )
    renderApp(App)
    document
        .getElementById(constants.LOADER_SELECTOR)
        .remove()
    const criticalCss = document
        .getElementById(constants.CRITICAL_CSS_SELECTOR)
    criticalCss.addEventListener('load', () => {
        criticalCss.remove()
    })
}

const { hot } = module as any
if (hot) {
    hot.accept('./containers/App', () => {
        renderApp(App)
    })
}
