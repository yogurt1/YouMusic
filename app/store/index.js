import {Map, fromJS} from "immutable"
import {composeWithDevTools as compose} from "redux-devtools-extension/developmentOnly"
import {applyMiddleware, createStore} from "redux"
import {combineReducers} from "redux-immutable"
import thunkMiddleware from "redux-thunk"
import {routerMiddleware} from "react-router-redux"
import arrayMiddleware from "./middlewares/array"
import reducersRegistry from "./reducers"

const getPersistedState = () => JSON.parse(localStorage.getItem("state")) || window.__PRELOADED_STATE__
export default function configureStore(history, client) {
    const preloadedState = process.browser &&
        fromJS(getPersistedState())

    const middlewares = [
        client.middleware(),
        routerMiddleware(history),
        arrayMiddleware,
        thunkMiddleware
    ]

    const reducer = combineReducers({
        apollo: client.reducer(),
        ...reducersRegistry
    })

    const finalCreateStore = compose(
        applyMiddleware(...middlewares)
    )(createStore)
    const store = finalCreateStore(reducer,
        preloadedState || void(0))

    if (module.hot) module.hot.accept("./reducers", () => {
        const {default: nextReducersRegistry} = require("./reducers")
        const nextReducer = combineReducers(nextReducersRegistry)
        store.replaceReducer(nextReducer)
    })

    return store
}
