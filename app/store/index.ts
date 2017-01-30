declare const System: any

import { Map, fromJS } from "immutable"
import {
    Store,
    Reducer,
    ReducersMapObject,
    applyMiddleware,
    createStore
} from "redux"
import { History } from "history"
import { ApolloClient } from "apollo-client"
import { combineReducers } from "redux-immutable"
import thunkMiddleware from "redux-thunk"
import { routerMiddleware } from "react-router-redux"
import { autoRehydrate } from "redux-persist"
import arrayMiddleware from "./middlewares/array"
import reducersRegistry, { records, State } from "./reducers"
import { composeWithDevTools, NORMALIZE_STATE } from "./util"
import { isBrowser, isDevEnv } from "../lib/util"

export { State }
export interface EnhancedStore extends Store<State> {
    injectReducers(nextReducersRegistry: ReducersMapObject): void
}

const preloadedState : State | void = !isBrowser ? void(0)
    : fromJS(window["__PRELOADED_STATE__"])

export default function configureStore({ history, client }: {
    history: History,
    client: ApolloClient
}): EnhancedStore {
    const middlewares = [
        thunkMiddleware,
        arrayMiddleware,
        client.middleware(),
        routerMiddleware(history)
    ]

    const apolloReducer = client.reducer() as Reducer<any>
    reducersRegistry["apollo"] = apolloReducer
    const reducer = combineReducers(reducersRegistry)

    const finalCreateStore = composeWithDevTools(
        applyMiddleware(...middlewares),
        autoRehydrate({ log: isDevEnv })
    )(createStore)

    const store : EnhancedStore = finalCreateStore(
        reducer, preloadedState)

    // Fix Immutable types
    store.dispatch({ type: NORMALIZE_STATE })

    store.injectReducers = nextReducersRegistry => {
        const finalReducersRegistry = Object.assign(
            reducersRegistry,
            nextReducersRegistry
        )
        const nextReducer = combineReducers(finalReducersRegistry)
        store.replaceReducer(reducer as Reducer<State>)
    }

    const { hot } = module as any
    if (hot) {
        hot.accept("./reducers", () => {
            System.import("./reducers")
                .then(m => m.default)
                .then(nextReducersRegistry =>
                      store.injectReducers(nextReducersRegistry))
        })
    }

    return store
}
