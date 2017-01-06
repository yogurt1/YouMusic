import "./polyfills"
import * as React from "react"
import * as ReactDOM from "react-dom"
import {AppContainer} from "react-hot-loader"
import {Router, browserHistory, match} from "react-router"
import {ApolloProvider} from "react-apollo"
import {IntlProvider} from "react-intl"
import {createNetworkInterface} from "apollo-client"
import {syncHistoryWithStore} from "react-router-redux"
import styleSheet from "styled-components/lib/models/StyleSheet"
import configureStore from "./store"
import configureApolloClient from "./store/apollo"
import routes from "./routes"
import {dom, isDevEnv, isBrowser, isProdEnv} from "./lib/util"

const target = document.getElementById("app")
const networkInterface = createNetworkInterface({uri: "/graphql"})
const locale = "en"
const client = configureApolloClient(networkInterface)
const store = configureStore(browserHistory, client)
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState(state) {
        return state.get("routing").toJS()
    }
})

const renderApp = () => match({routes, history},
    (err, _, renderProps) => ReactDOM.render(
        <AppContainer>
            <ApolloProvider
                client={client}
                store={store}>
                <IntlProvider locale={locale}>
                    <Router {...renderProps} />
                </IntlProvider>
            </ApolloProvider>
    </AppContainer>, target))

renderApp()

window.onload = () => {
    dom(".__CRITICAL_CSS__")(el => el.remove())
}


if (isDevEnv) {
    // const {whyDidYouUpdate} = require("why-did-you-update")
    // whyDidYouUpdate(React)
    // require("offline-plugin/runtime").install()
    window["__APOLLO_CLIENT__"] = client
}

const {hot} = module as any
if (hot) hot.accept(() => {
})
