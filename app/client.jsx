import 'whatwg-fetch'
import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import {Router, browserHistory} from 'react-router'
import {ApolloProvider} from 'react-apollo'
import {createNetworkInterface} from 'apollo-client'
import {syncHistoryWithStore} from 'react-router-redux'
import styleSheet from 'styled-components/lib/models/StyleSheet'
import configureApolloClient from './data'
import configureStore from './store'
import routes from './routes'

const networkInterface = createNetworkInterface({
    uri: '/graphql'
})
const client = configureApolloClient(networkInterface)
const store = configureStore(browserHistory, client)
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState(state) {
        return state.get('routing').toJS()
    }
})

render((
    <AppContainer>
        <ApolloProvider
            client={client}
            store={store}>
            <Router
                key={Math.random()}
                routes={routes}
                history={history} />
        </ApolloProvider>
    </AppContainer>
), document.querySelector('#app'))

if (module.hot) module.hot.accept(() => {
    // styleSheet.flush()
})
