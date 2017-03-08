import global from "global"
import * as React from "react"
import { renderToString } from "react-dom/server"
import LRURenderCache from "react-dom-stream/lru-render-cache"
import * as R from "ramda"
import Html from "app/Html"
import App from "app/containers/App"
import { Router, StaticRouter } from "react-router"
import { ApolloProvider } from "react-apollo"
import { IntlProvider } from "react-intl"
import { ThemeProvider } from "styled-components"
import { getDataFromTree } from "react-apollo/server"
import { createNetworkInterface } from "apollo-client"
import * as styleSheet from "styled-components/lib/models/StyleSheet"
import createHistory, { Context as RoutingContext } from "app/lib/staticHistory"
import configureStore from "app/store"
import configureApolloClient from "app/store/apollo"
import { DEFAULT_LOCALE } from "app/lib/constants"
import theme from "app/theme"
import * as config from "../../config"

const renderCache = LRURenderCache({ max: 64 * 1024 * 1024 })
const joinRules = R.pipe(
    R.map(R.prop("cssText")),
    R.join(""),
)

export default async ctx => {
    ctx.type = "html"
    // styleSheet.flush()

    const routingContext: RoutingContext = {}
    const locale = ctx.request.getLocaleFromHeader() || DEFAULT_LOCALE
    const location = ctx.request.url
    const client = configureApolloClient(
        createNetworkInterface({
            uri: ctx.request.host,
            opts: {
                credentials: "same-origin",
                headers: ctx.request.headers,
            },
        })
    )
    const history = createHistory({ location, context: routingContext })
    const store = configureStore({ client, history })
    // store.dispatch({
    //     type: "SET_CONFIG_KEY",
    //     payload: {
    //         userAgent: ctx.request.headers["user-agent"]
    //     }
    // })

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

    // await Promise.all(actions)
    // await getDataFromTree(componentTree)

    const state = store.getState()
    const styles = joinRules(styleSheet.styleSheet.sheet.cssRules)
    // const finalState = state.set(client.reduxRootKey, client.getInitialState())

    // ctx.res.write("<!doctype html")
    ctx.body = renderToString(
        <Html
            locale={locale}
            styles={styles}
            state={state}>
            {componentTree}
        </Html>
    )
}

