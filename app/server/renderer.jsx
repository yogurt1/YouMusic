import React from "react"
import Html from "app/components/Html"
import {match, RouterContext, createMemoryHistory} from "react-router"
import {ApolloProvider} from "react-apollo"
import {IntlProvider} from "react-intl"
import {renderToString, renderToStaticMarkup} from "react-dom/server"
import {getDataFromTree} from "react-apollo/server"
import {createNetworkInterface} from "apollo-client"
import {syncHistoryWithStore} from "react-router-redux"
import styleSheet from "styled-components/lib/models/StyleSheet"
import {injectGlobal} from "styled-components"
import routes from "app/routes"
import configureStore from "app/store"
import configureApolloClient from "app/store/apollo"

const isDevServer = /dev/.test(process.env.npm_lifecycle_event)
const getStyles = () => styleSheet.rules().map(r => r.cssText).join("")
const matchAsync = opts => new Promise((resolve, reject) =>
        match(opts, (err, ...rest) => {
            if (err) return reject(err)
            return resolve(rest)
        }))

export default async function renderer(ctx) {
    ctx.type = "html"
    // styleSheet.flush()

    const locale = "en"
    const location = ctx.request.url

    if (isDevServer) {
        return ctx.body = "<!doctype html" + renderToStaticMarkup(
            <Html />
        )
    }

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

    const actions = []
    for (const action of actions) {
        store.dispatch(action)
    }

    const {params, components} = renderProps
    ctx.state = {
        ...ctx.state,
        store,
        params
    }

    const component = (
        <ApolloProvider
            client={client}
            store={store}>
            <IntlProvider locale={locale}>
                <RouterContext {...renderProps} />
            </IntlProvider>
        </ApolloProvider>
    )

    { // Preserve local scoped variables
        const actions = []
        const method = ctx.method.toLowerCase()

        for (let component of components) {
            if (!component) continue

            while (component.WrappedComponent) {
                component = component.WrappedComponent
            }

            const action = component[method]
            if (typeof(action) === "function") {
                actions.push(action(ctx))
            }
        }

        await Promise.all(actions)
    }

    await getDataFromTree(component)

    const htmlProps = {
        children: component,
        styles: getStyles(),
        state: store.getState()
    }

    ctx.body = `<!doctype html>${renderToString(<Html {...htmlProps} />)}`
}
