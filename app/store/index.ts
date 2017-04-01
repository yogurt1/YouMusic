declare const System: {
    import(path: string): Promise<NodeModule & { default: any }>
}

import global from "global"
import { History } from "history"
import { ApolloClient } from "apollo-client"
import * as R from "ramda"
import * as Redux from "redux"
import { combineReducers } from "redux-immutable"
import thunk from "redux-thunk"
import promise from "redux-promise"
import array from "./middlewares/array"
import { routerReducer, routerMiddleware } from "react-router-redux"
import { autoRehydrate } from "redux-persist-immutable"
import reducersRegistry, { State } from "./reducers"
import platform from "../lib/platform"
import { APOLLO_STATE_KEY } from "../lib/constants"

const composeWithDevTools = (
    platform.isBrowser &&
    platform.isDev &&
    global["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]
) || Redux.compose


export { State }

export default ({ initialState, history, client }: {
    initialState?: Object | void,
    history: History,
    client: ApolloClient
}): Redux.Store<State> => {
    const middleware: Redux.StoreEnhancer<State> = Redux.applyMiddleware(
        thunk,
        promise,
        client.middleware(),
        routerMiddleware(history),
    )

    const injectClient = R.set(
        R.lensProp(APOLLO_STATE_KEY),
        client.reducer()
    )

    const finalCombineReducers = R.pipe(
        injectClient,
        combineReducers,
    ) as (reducersRegistry: Redux.ReducersMapObject) => Redux.Reducer<State>

    const finalCreateStore = composeWithDevTools(
        middleware,
        autoRehydrate({ log: platform.isDev }),
    )(Redux.createStore)

    const reducer = finalCombineReducers(reducersRegistry)
    const store: Redux.Store<State> = finalCreateStore(reducer, initialState)

    const { hot } = module as any
    if (hot) {
        hot.accept("./reducers", () => {
            // TODO: dynamic import() syntax
            System.import("./reducers")
                .then(ns => {
                    const nextReducersRegistry = ns.default
                    const nextReducer = finalCombineReducers(nextReducersRegistry)
                    store.replaceReducer(nextReducer)
                })
        })
    }

    return store
}

