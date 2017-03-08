declare const System: {
    import(path: string): Promise<NodeModule & { default: any }>
}

import global from "global"
import {
    Store,
    Reducer,
    ReducersMapObject,
    createStore,
    applyMiddleware,
    compose
} from "redux"
import { ApolloClient } from "apollo-client"
import { combineReducers } from "redux-immutable"
import thunk from "redux-thunk"
import promise from "redux-promise"
import array from "./middlewares/array"
import routing from "./middlewares/routing"
import { autoRehydrate } from "redux-persist-immutable"
import reducersRegistry, { State } from "./reducers"
import platform from "../lib/platform"
import { APOLLO_STATE_KEY } from "../lib/constants"

const composeWithDevTools = (
    platform.isBrowser &&
    platform.isDev &&
    global["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] ||
    compose
)


export { State }
export interface EnhancedStore extends Store<State> {
    injectReducers(nextReducersRegistry: ReducersMapObject): void
}

export default ({ initialState, history, client }: {
    initialState?: Object | void,
    history: History,
    client: ApolloClient
}): EnhancedStore => {
    // const normalizedState = reducer(
    //     initialState,
    //     { type: NORMALIZE_STATE }
    // )
    const middleware = applyMiddleware(
        thunk,
        // promise,
        // array,
        client.middleware(),
        routing(history),
    )

    const apolloReducer = client.reducer() as Reducer<any>
    reducersRegistry[APOLLO_STATE_KEY] = apolloReducer
    const reducer = combineReducers(reducersRegistry)

    const finalCreateStore = composeWithDevTools(
        middleware,
        autoRehydrate({ log: platform.isDev })
    )(createStore)

    const store: EnhancedStore = finalCreateStore(
        reducer,
        initialState
    )

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
                .then(nextReducersRegistry => {
                    store.injectReducers(
                        nextReducersRegistry
                    )
                })
        })
    }

    return store
}

