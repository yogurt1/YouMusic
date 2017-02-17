declare const System: any

import { Map, fromJS } from "immutable"
import {
    Store,
    Reducer,
    ReducersMapObject,
    applyMiddleware,
    createStore
} from "redux"
import { ApolloClient } from "apollo-client"
import { combineReducers } from "redux-immutable"
import transit from "transit-immutable-js"
import thunkMiddleware from "redux-thunk"
import { autoRehydrate } from "redux-persist"
import arrayMiddleware from "./middlewares/array"
import reducersRegistry, { records, State } from "./reducers"
import { composeWithDevTools } from "./util"
import { isBrowser, isDevEnv } from "../lib/util"

export { State }
export interface EnhancedStore extends Store<State> {
    injectReducers(nextReducersRegistry: ReducersMapObject): void
}

// const preloadedStateKey = "__PRELOADED__STATE__"
// const preloadedState : State | void = !(
//     isBrowser && window[preloadedStateKey]
// ) ? undefined : transit.fromJSON(window[preloadedStateKey])
const preloadedState = undefined

const configureStore = ({ client }: {
    client: ApolloClient
}): EnhancedStore => {
    const middlewares = [
        thunkMiddleware,
        arrayMiddleware,
        client.middleware()
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

    // Normalize Immutable types
    // store.dispatch({ type: NORMALIZE_STATE })

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

export default configureStore
