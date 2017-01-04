import * as React from "react"
import {Router, browserHistory} from "react-router"
import {ApolloProvider} from "react-apollo"
import {IntlProvider} from "react-intl"
import {createNetworkInterface} from "apollo-client"
import {syncHistoryWithStore} from "react-router-redux"
import configureStore from "./store"
import configureApolloClient from "./store/apollo"
import routes from "./routes"
import styleSheet from "styled-components/lib/models/StyleSheet"
import {dom, isDevEnv, isBrowser, isProdEnv} from "./lib/util"

export {routes}

const networkInterface = createNetworkInterface({uri: "/graphql"})
const locale = "en"
const client = configureApolloClient(networkInterface)
const store = configureStore(browserHistory, client)
export const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState(state) {
        return state.get("routing").toJS()
    }
})

if (isDevEnv) {
    window["__APOLLO_CLIENT__"] = client
}

const App: React.StatelessComponent<any> = (renderProps) => (
    <ApolloProvider
        client={client}
        store={store}>
        <IntlProvider locale={locale}>
            <Router {...renderProps} />
        </IntlProvider>
    </ApolloProvider>
)

export default App
