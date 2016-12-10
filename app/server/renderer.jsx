import React from 'react'
import Html from 'app/components/Html'
import {match, RouterContext, createMemoryHistory} from 'react-router'
import {ApolloProvider} from 'react-apollo'
import {renderToString, renderToStaticMarkup} from 'react-dom/server'
import {getDataFromTree} from 'react-apollo/server'
import {createNetworkInterface} from 'apollo-client'
import {syncHistoryWithStore} from 'react-router-redux'
import styleSheet from 'styled-components/lib/models/StyleSheet'
import {injectGlobal} from 'styled-components'
// import baseStyles from 'app/lib/baseStyles'
import routes from 'app/routes'
import configureStore from 'app/store'
import configureApolloClient from 'app/store/apollo'

const isDevServer = /dev/.test(process.env.npm_lifecycle_event)
const getStyles = () => styleSheet.rules().map(r => r.cssText).join('')

export default async function renderer(ctx) {
    ctx.type = "html"
    // styleSheet.flush()
    const locale = "en"
    const location = ctx.request.url

    if (isDevServer) {
        ctx.body = "<!doctype html" + renderToStaticMarkup(
            <Html />
        )
        return
    }

    const networkInterface = createNetworkInterface({
        uri: ctx.request.host,
        opts: {
            credentials: 'same-origin',
            headers: ctx.request.headers
        }
    })
    const client = configureApolloClient(networkInterface)
    const memoryHistory = createMemoryHistory(location)
    const store = configureStore(memoryHistory, client)
    const history = syncHistoryWithStore(memoryHistory, store, {
        selectLocationState(state) {
            return state.get('routing').toJS()
        }
    })

    const [redir, renderProps] = await new Promise((resolve, reject) => {
        match({location, routes, history}, (err, ...args) => {
            if (err) return reject(err)
            resolve(args)
        })
    })

    {
        const method = ctx.method.toLowerCase()
        const {params, location, components} = renderProps
        Object.assign(ctx.state, {store, params, location})

        for (let component of components) {
            if (!component) continue

            while (component && !component[method]) {
                component = component.WrappedComponent
            }

            if (component && component[method]) {
                await component[method](ctx)
            }
        }
    }

    const component = (
        <ApolloProvider
            client={client}
            store={store}>
            <RouterContext {...renderProps} />
        </ApolloProvider>
    )

    await getDataFromTree(component)

    const htmlProps = {
        locale,
        children: component,
        styles: getStyles(),
        state: store.getState(),
    }

    ctx.body = "<!doctype html>" + renderToString(
        <Html {...htmlProps} />
    )
}
