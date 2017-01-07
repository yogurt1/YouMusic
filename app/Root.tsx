import * as React from "react"
import {Router, browserHistory, match} from "react-router"
import {ApolloProvider} from "react-apollo"
import {IntlProvider} from "react-intl"
import {createNetworkInterface} from "apollo-client"
import {syncHistoryWithStore} from "react-router-redux"
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

window["__APOLLO_CLIENT__"] = client

const getKey = () => /* isDevEnv */ false ? Math.random() : "-"

const Root: React.StatelessComponent<any> = () => (
    <ApolloProvider
        client={client}
        store={store}>
        <IntlProvider locale={locale}>
            <Router
                routes={routes}
                history={history}
                key={getKey()}
            />
        </IntlProvider>
    </ApolloProvider>
 )

 export default Root
