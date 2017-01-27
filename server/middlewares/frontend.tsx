import { promisify } from "bluebird"
import * as React from "react"
import * as ReactDOM from "react-dom/server"
import Html from "app/Html"
import { match, RouterContext, createMemoryHistory } from "react-router"
import { ApolloProvider } from "react-apollo"
import { IntlProvider } from "react-intl"
import { ThemeProvider } from "styled-components"
import { getDataFromTree } from "react-apollo/server"
import { createNetworkInterface } from "apollo-client"
import { syncHistoryWithStore } from "react-router-redux"
import * as styleSheet from "styled-components/lib/models/StyleSheet"
import routes from "app/routes"
import configureStore from "app/store"
import configureApolloClient from "app/store/apollo"
import * as config from "../../config"

const theme = require("app/theme.json")
const render = node => `
    <!doctype html>
    ${ReactDOM.renderToString(node)}
`
const matchAsync = promisify(match)

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
    const memoryHistory = createMemoryHistory(location)
    const store = configureStore({ client, history: memoryHistory })
    const history = syncHistoryWithStore(memoryHistory, store, {
        selectLocationState(state) {
            return state.get("routing").toJS()
        }
    })


    const { redir, renderProps } = await new Promise<any>((resolve, reject) => {
        return match({ location, routes, history }, (err, redir, renderProps) => {
            if (err) {
                return reject(err)
            }

            return resolve({ redir, renderProps })
        })
    })

    ctx.state = {
        ...ctx.state,
        params: renderProps.params
    }

    const componentTree = (
        <ApolloProvider
            client={client}
            store={store}>
            <IntlProvider locale={locale}>
                <ThemeProvider theme={theme}>
                    <RouterContext {...renderProps} />
                </ThemeProvider>
            </IntlProvider>
        </ApolloProvider>
    )

    const method = ctx.method.toLowerCase()
    const actions = []

    for (const nextComponent of renderProps.components) {
        if (!nextComponent) {
            continue
        }

        const allAction = nextComponent["all"]
        const action = nextComponent[method]

        if (typeof(allAction) === "function") {
            actions.push(allAction(ctx, store))
        }

        if (typeof(action) === "function") {
            actions.push(action(ctx, store))
        }
    }

    await Promise.all(actions)
    await getDataFromTree(componentTree)

    const state = store.getState()
    const styles = styleSheet.rules()
        .map(r => r.cssText).join("")

    ctx.body = render(
        <Html
            styles={styles}
            state={state}>
            {componentTree}
        </Html>
    )
}

export default frontendMiddleware
