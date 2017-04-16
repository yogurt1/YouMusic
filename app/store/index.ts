import { History } from "history"
import { ApolloClient } from "apollo-client"
import * as R from "ramda"
import * as Redux from 'redux'
import { combineReducers as combineReducersImmutable } from 'redux-immutable'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import array from './middlewares/array'
import { routerReducer, routerMiddleware } from "react-router-redux"
import { autoRehydrate } from "redux-persist-immutable"
import reducersRegistry, { State } from "./reducers"
import * as constants from "../lib/constants"
import platform from "../lib/platform"

const composeWithDevTools = (
    platform.isBrowser &&
    platform.isDev &&
    window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
) || Redux.compose

export { State }

type Opts = {
    initialState?: State | void,
    locale: string,
    history: History,
    client: ApolloClient
}

const configureStore = (opts: Opts): Redux.Store<State> => {
    const {
        initialState,
        history,
        client,
        locale
    } = opts

    const middlewares: Redux.Middleware[] = [
        thunk,
        promise,
        client.middleware(),
        routerMiddleware(history)
    ]

    const injectClient = R.set(
        R.lensProp(constants.APOLLO_STATE_KEY),
        client.reducer()
    )

    const finalCombineReducers = R.pipe(
        injectClient,
        combineReducersImmutable,
    ) as (reducersRegistry: Redux.ReducersMapObject) => Redux.Reducer<State>

    const enhancer: Redux.StoreEnhancer<State> = composeWithDevTools(
        Redux.applyMiddleware(...middlewares),
        autoRehydrate({ log: platform.isDev }),
    )

    const reducer = finalCombineReducers(reducersRegistry)
    const store: Redux.Store<State> = Redux.createStore(
        reducer,
        initialState,
        enhancer
    ) as Redux.Store<State>

    const { hot } = module as any
    if (hot) {
        hot.accept('./reducers', async () => {
            const ns = await import('./reducers')
            const nextReducersRegistry = ns.default
            const nextReducer = finalCombineReducers(nextReducersRegistry)
            store.replaceReducer(nextReducer)
        })
    }

    return store
}

export default configureStore
