import 'font-awesome/css/font-awesome.min.css'
import 'semantic-ui-css/semantic.min.css'
import 'tinymce/tinymce.min.js'
import 'whatwg-fetch'
import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import {match, RouterContext, browserHistory} from 'react-router'
import {ApolloProvider} from 'react-apollo'
import {createNetworkInterface} from 'apollo-client'
import {syncHistoryWithStore} from 'react-router-redux'
import styleSheet from 'styled-components/lib/models/StyleSheet'
import configureStore from './store'
import configureApolloClient from './store/apollo'
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
const target = document.querySelector('#app')
const asyncMatch = (opts) => new Promise((resolve, reject) =>
        match(opts, (err, ...args) => resolve(args)))

window.addEventListener('load', async () => {
    document.querySelector("style.__CRITICAL_CSS__").remove()

    const [_, renderProps] = await asyncMatch({history, routes})
    const component = (
        <AppContainer>
            <ApolloProvider
                client={client}
                store={store}>
                <RouterContext {...renderProps} />
            </ApolloProvider>
        </AppContainer>
    )
    render(component, target)
})


if (module.hot) module.hot.accept(() => {
    // styleSheet.flush()
})
