import "./polyfills"
import * as React from "react"
import * as ReactDOM from "react-dom"
import {AppContainer} from "react-hot-loader"
// import Root from "./Root"
import { Router, browserHistory, match } from "react-router"
import { ApolloProvider } from "react-apollo"
import { IntlProvider } from "react-intl"
import { ThemeProvider } from "styled-components"
import { createNetworkInterface } from "apollo-client"
import { syncHistoryWithStore } from "react-router-redux"
import configureStore from "./store"
import configureApolloClient from "./store/apollo"
import routes from "./routes"
import { doms, isDevEnv, isBrowser, isProdEnv } from "./lib/util"
import AuthService from "./services/AuthService"

const theme = require("./theme.json")
const target = document.querySelector("#app")
const locale = "en"
const networkInterface = createNetworkInterface({uri: "/graphql"})
const client = configureApolloClient(networkInterface)
const store = configureStore(browserHistory, client)
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState(state) {
        return state.get("routing").toJS()
    }
})


if (isDevEnv) {
    // const {whyDidYouUpdate} = require("why-did-you-update")
    // whyDidYouUpdate(React)
    // require("offline-plugin/runtime").install()
    window["__APOLLO_CLIENT__"] = client
}

const renderApp = () => match({ history, routes },
    (err, _, renderProps) => ReactDOM.render(
        <AppContainer>
            <ApolloProvider
                client={client}
                store={store}>
                <IntlProvider locale={locale}>
                    <ThemeProvider theme={theme}>
                        <Router {...renderProps} />
                    </ThemeProvider>
                </IntlProvider>
            </ApolloProvider>
        </AppContainer>, target))

renderApp()

window.onload = () => {
    // remove styled-components, because it be force rehydrated
    doms(".__CRITICAL_CSS__",
         ".__LOADER__")(el => el.remove())
}

const { hot } = module as any
if (hot) hot.accept()
