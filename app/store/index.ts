import {Map, fromJS} from "immutable"
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly"
import {
    Store,
    Reducer,
    ReducersMapObject,
    applyMiddleware,
    createStore
} from "redux"
import {History} from "history"
import {ApolloClient} from "apollo-client"
import {combineReducers} from "redux-immutable"
import thunkMiddleware from "redux-thunk"
import {routerMiddleware} from "react-router-redux"
import arrayMiddleware from "./middlewares/array"
import reducersRegistry, {State} from "./reducers"
import {isBrowser} from "../lib/util"

export {State}
export interface EnhancedStore extends Store<State> {
    injectReducers(nextReducersRegistry: ReducersMapObject): void
}

const preloadedState: State | void = !isBrowser ? void(0) :
    fromJS(JSON.parse(
        localStorage.getItem("state")) ||
            window["__PRELOADED_STATE__"])

export default function configureStore(history: History, client: ApolloClient): EnhancedStore {
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
        applyMiddleware(...middlewares))(createStore)

    const store: EnhancedStore = finalCreateStore(reducer,
        preloadedState || void(0))

    store.injectReducers = nextReducersRegistry => {
        const _ = Object.assign(reducersRegistry,
            nextReducersRegistry)
        const nextReducer = combineReducers(_)
        store.replaceReducer(reducer)
    }

    const {hot} = module as any
    if (hot) hot.accept("./reducers", () => {
        const {default: nextReducersRegistry} = require("./reducers")
        store.injectReducers(nextReducersRegistry)
    })


    return store
}
