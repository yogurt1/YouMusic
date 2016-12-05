import 'isomorphic-fetch'
import Koa from 'koa'
import React from 'react'
import Html from './components/Html'
import graphqlSchema from './data/schema'
import bodyParser from 'koa-bodyparser'
import serveStatic from 'koa-static'
import mount from 'koa-mount'
import compress from 'koa-compress'
import {match, RouterContext, createMemoryHistory} from 'react-router'
import {ApolloProvider} from 'react-apollo'
import {renderToString, renderToStaticMarkup} from 'react-dom/server'
import {getDataFromTree} from 'react-apollo/server'
import {createNetworkInterface} from 'apollo-client'
import {graphqlKoa, graphiqlKoa} from 'graphql-server-koa'
import {syncHistoryWithStore} from 'react-router-redux'
import configureStore from './store'
import configureApolloClient from './data'
import routes from './routes'
import styleSheet from 'styled-components/lib/models/StyleSheet'
import config from './config'

const compose = (...mws) => (ctx, next) => {
    const dispatch = async i => {
        const mw = mws[i] || next
        return mw(ctx, () => dispatch(i + 1))
    }
    return dispatch(0)
}
const app = new Koa()

if (DEV) {
    const logger = require('koa-logger')
    app.use(logger())
    app.use(mount('/graphiql', graphiqlKoa({endpointURL: '/graphql'})))
}

app.use(compose(
    compress(),
    serveStatic('./static')
))

app.use(mount('/graphql', compose(
    bodyParser(),
    graphqlKoa(ctx => ({
        schema: graphqlSchema,
        rootValue: {
            ctx
        }
    }))
)))

const isDevServer = /dev/.test(process.env.npm_lifecycle_event)
app.use(async ctx => {
    ctx.type = 'html'
    if (isDevServer) return ctx.body = renderToStaticMarkup(
        <Html />
    )

    const locale = "en" // await getLocale(ctx)
    const location = ctx.request.url

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
        state: store.getState(),
        styles: styleSheet.rules().map(r => r.cssText).join('')
    }

    ctx.body = renderToString(
        <Html {...htmlProps} />
    )
})

app.on('error', err => {
    console.error(err)
})
export default app
