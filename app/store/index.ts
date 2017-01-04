import {Map} from "immutable"
import transit from "transit"
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly"
import {applyMiddleware, createStore} from "redux"
import {combineReducers} from "redux-immutable"
import thunkMiddleware from "redux-thunk"
import {routerMiddleware} from "react-router-redux"
import arrayMiddleware from "./middlewares/array"
import reducersRegistry from "./reducers"

export interface State {
    routing: any,
    form: any,
    [key: string]: any
}

const preloadedState = !(<any>process).browser ? void(0) :
    transit.fromJSON(
        localStorage.getItem("state") ||
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

    if ((<any>module).hot) (<any>module).hot.accept("./reducers", () => {
        const {default: nextReducersRegistry} = require("./reducers")
        const nextReducer = combineReducers(nextReducersRegistry)
        store.replaceReducer(nextReducer)
    })

    return store
}
