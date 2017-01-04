import "./polyfills"
import * as React from "react"
import * as ReactDOM from "react-dom"
import {AppContainer} from "react-hot-loader"
import {Router, match, browserHistory} from "react-router"
import {ApolloProvider} from "react-apollo"
import {IntlProvider} from "react-intl"
import {createNetworkInterface} from "apollo-client"
import {syncHistoryWithStore} from "react-router-redux"
import styleSheet from "styled-components/lib/models/StyleSheet"
import configureStore from "./store"
import configureApolloClient from "./store/apollo"
import routes from "./routes"

const networkInterface = createNetworkInterface({uri: "/graphql"})
const locale = "en"
const client = configureApolloClient(networkInterface)
const store = configureStore(browserHistory, client)
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState(state) {
        return state.get("routing").toJS()
    }
})
const target = document.querySelector("#app")
const render = () => match({routes, history},
    (err, _, renderProps) => ReactDOM.render(
        <AppContainer>
            <ApolloProvider
                client={client}
                store={store}>
                <IntlProvider locale={locale}>
                    <Router {...renderProps} key={Math.random()} />
                </IntlProvider>
            </ApolloProvider>
        </AppContainer>, target))

window.onload = () => {
    render()
    const noscripts = document.querySelectorAll("noscript")
    Array.prototype.forEach.call(noscripts, el => el.remove())
    document.querySelector(".__CRITICAL_CSS__").remove()
}


if (process.env.NODE_ENV !== "production") {
    // const {whyDidYouUpdate} = require("why-did-you-update")
    // whyDidYouUpdate(React)
    (window as any).__APOLLO_CLIENT__ = client
    // require("offline-plugin/runtime").install()
}

if ((module as any).hot) (module as any).hot.accept()
