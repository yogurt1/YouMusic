import global from 'global'
import * as R from 'ramda'
import { lensProp as lensPropImmutable } from 'ramda-immutable'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import Html from 'app/Html'
import App from 'app/containers/App'
import createHistory, { RoutingContext } from 'app/lib/staticHistory'
import { ConnectedRouter as Router } from 'react-router-redux'
import { ApolloProvider } from 'react-apollo'
import { IntlProvider } from 'react-intl'
import { ThemeProvider, styleSheet } from 'styled-components'
import { getDataFromTree } from 'react-apollo/server'
import { createLocalInterface } from 'apollo-local-query'
import * as graphql from 'graphql'
import schema from 'server/data/schema'
import configureStore from 'app/store'
import configureApolloClient from 'app/store/apollo'
import {
    DEFAULT_LOCALE,
    APOLLO_STATE_KEY
} from 'app/lib/constants'
import { actions as configActions } from 'app/store/ducks/config'
import theme from 'app/theme'
import config from 'server/config'

const injectApolloState = R.set(
    lensPropImmutable(APOLLO_STATE_KEY)
)

export default async ctx => {
    // TODO: Flush SSR CSS
    // styleSheet.reset()

    const routingContext: RoutingContext = {}
    const locale = ctx.request.getLocaleFromHeader() || DEFAULT_LOCALE
    const location = ctx.request.url
    const client = configureApolloClient(
        createLocalInterface(graphql, schema)
    )
    const history = createHistory({ location, context: routingContext })
    const store = configureStore({ client, history })

    // TODO: Set globals in store
    store.dispatch(
        configActions.setConfigKeys({
            userAgent: ctx.request.headers['user-agent']
        })
    )

    Object.assign(ctx.state, {
        locale,
        client,
        history,
        store,
        routingContext,
    })

    const componentTree = (
        <ApolloProvider client={client} store={store}>
            <IntlProvider
                locale={locale}>
                <ThemeProvider theme={theme}>
                    <Router history={history}>
                        <App />
                    </Router>
                </ThemeProvider>
            </IntlProvider>
        </ApolloProvider>
    )

    const { url: redirectUrl } = routingContext
    if (redirectUrl) {
        ctx.redirect(redirectUrl)
        return
    }

    // TODO: Load data from routingContext
    // await Promise.all(actions)
    await getDataFromTree(componentTree)

    const componentTreeMarkup = renderToString(componentTree)
    // TODO: Inject Apollo state
    // const state = injectApolloState(
    //     client.getInitialState(),
    //     store.getState()
    // )
    const state = store.getState()
    const styles = styleSheet.getCSS()

    const finalMarkup = renderToString(
        <Html
            locale={locale}
            styles={styles}
            state={state}
        >
            {componentTreeMarkup}
        </Html>
    )

    ctx.type = 'html'
    ctx.body = `<!doctype html>${finalMarkup}`
}

