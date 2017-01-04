import {Map, fromJS} from "immutable"
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly"
import {applyMiddleware, createStore} from "redux"
import {combineReducers} from "redux-immutable"
import thunkMiddleware from "redux-thunk"
import {routerMiddleware} from "react-router-redux"
import arrayMiddleware from "./middlewares/array"
import reducersRegistry, {State} from "./reducers"

export {State}

const {browser} = process as any
const preloadedState: State | void = !browser ? void(0) :
    fromJS(JSON.parse(
        localStorage.getItem("state")) ||
            window["__PRELOADED_STATE__"])

export default function configureStore(history, client) {
    const middlewares = [
        thunkMiddleware,
        client.middleware(),
        routerMiddleware(history),
        arrayMiddleware
    ]

    const reducer = combineReducers({
        apollo: client.reducer(),
        ...reducersRegistry
    })

    const enhancer = composeWithDevTools(
        applyMiddleware(...middlewares))

    const store = createStore(reducer,
        preloadedState, enhancer)

    const {hot} = module as any
    if (hot) hot.accept("./reducers", () => {
        const {default: nextReducersRegistry} = require("./reducers")
        const nextReducer = combineReducers(nextReducersRegistry)
        store.replaceReducer(nextReducer)
    })

    return store
}
