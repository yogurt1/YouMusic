import * as React from "react"
import * as ReactDOM from "react-dom/server"
import Html from "app/Html"
import {match, RouterContext, createMemoryHistory} from "react-router"
import {ApolloProvider} from "react-apollo"
import {IntlProvider} from "react-intl"
import {ThemeProvider} from "styled-components"
import {getDataFromTree} from "react-apollo/server"
import {createNetworkInterface} from "apollo-client"
import {syncHistoryWithStore} from "react-router-redux"
import * as styleSheet from "styled-components/lib/models/StyleSheet"
import {injectGlobal} from "styled-components"
import routes from "app/routes"
import configureStore from "app/store"
import configureApolloClient from "app/store/apollo"

const theme = require("app/theme.json")
const isDevServer = /dev/.test(process.env.npm_lifecycle_event)
const render = node => "<!doctype html>" + ReactDOM.renderToString(node)
const getStyles: () => string = () => styleSheet.rules().map(r => r.cssText).join("")

type MatchAsync = (opts: any) => Promise<Array<any>>
const matchAsync: MatchAsync = opts => new Promise((resolve, reject) =>
        match(opts, (err, ...rest) => {
            if (err) return reject(err)
            return resolve(rest)
        }))

export default async ctx => {
    ctx.type = "html"
    // styleSheet.flush()

    if (isDevServer) {
        ctx.body = render(<Html />)
        return
    }

    const locale = "en"
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
    const store = configureStore(memoryHistory, client)
    const history = syncHistoryWithStore(memoryHistory, store, {
        selectLocationState(state) {
            return state.get("routing").toJS()
        }
    })


    const [redir, renderProps] = await matchAsync({location, routes, history})

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
        if (!nextComponent) continue

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
    // await getDataFromTree(componentTree)

    ctx.body = render(
        <Html
            styles={getStyles()}
            state={store.getState()}>
            {componentTree}
        </Html>
    )
}
