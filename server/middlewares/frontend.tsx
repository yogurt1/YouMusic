import { promisify } from "bluebird"
import * as React from "react"
import * as ReactDOM from "react-dom/server"
import Html from "app/Html"
import Root from "app/Root"
import { StaticRouter } from "react-router-dom"
import { ApolloProvider } from "react-apollo"
import { IntlProvider } from "react-intl"
import { ThemeProvider } from "styled-components"
import { getDataFromTree } from "react-apollo/server"
import { createNetworkInterface } from "apollo-client"
import * as styleSheet from "styled-components/lib/models/StyleSheet"
import configureStore from "app/store"
import configureApolloClient from "app/store/apollo"
import * as config from "../../config"

const theme = require("app/theme.json")
const render = node => `
    <!doctype html>
    ${ReactDOM.renderToString(node)}
`
const frontendMiddleware = async ctx => {
    ctx.type = "html"
    // styleSheet.flush()

    if (config.webpack.isWebpack) {
        ctx.body = render(<Html />)
        return
    }

    const locale = ctx.request.getLocaleFromHeader() || "en"
    const location = ctx.request.url

    // const cached = ctx.cashed(2 * 60 * 60)
    const networkInterface = createNetworkInterface({
        uri: ctx.request.host,
        opts: {
            credentials: "same-origin",
            headers: ctx.request.headers
        }
    })

    const client = configureApolloClient(networkInterface)
    const store = configureStore({ client })
    const context = {} as any

    ctx.state = {
        ...ctx.state,
        routingContext: context
    }

    const componentTree = (
        <ApolloProvider
            client={client}
            store={store}>
            <IntlProvider locale={locale}>
                <ThemeProvider theme={theme}>
                    <StaticRouter
                        location={location}
                        context={context}>
                        <Root />
                    </StaticRouter>
                </ThemeProvider>
            </IntlProvider>
        </ApolloProvider>
    )

    if (context.url) {
        ctx.redirect(context.url)
        return
    }

    // await Promise.all(actions)
    await getDataFromTree(componentTree)

    const state = store.getState()
    const styles = styleSheet.rules()
        .map(r => r.cssText).join("")

    // state[client.reduxRootKey] = client.getInitialState()
    ctx.body = render(
        <Html
            styles={styles}
            state={state}>
            {componentTree}
        </Html>
    )
}

export default frontendMiddleware
