import {fromJS} from 'immutable'
import {composeWithDevTools as compose} from 'redux-devtools-extension/developmentOnly'
import {applyMiddleware, createStore} from 'redux'
import {combineReducers} from 'redux-immutable'
import thunkMiddleware from 'redux-thunk'
import {routerMiddleware} from 'react-router-redux'
import arrayMiddleware from './middlewares/array'
import reducersRegistry from './reducers'

export default function configureStore(history, client) {
    const preloadedState = process.env.BROWSER && fromJS(
        localStorage.getItem('state') ||
        window.__PRELOADED__STATE)
    
    const middlewares = [
        client.middleware(),
        arrayMiddleware,
        thunkMiddleware
    ]

    const reducer = combineReducers({
        apollo: client.reducer(),
        ...reducersRegistry
    })
    
    const store = createStore(reducer, preloadedState, compose(
        applyMiddleware(...middlewares)
    ))

    if (module.hot) module.hot.accept('./reducers', () => {
        const {default: nextReducersRegistry} = require('./reducers')
        const nextReducer = combineReducers(nextReducersRegistry)
        store.replaceReducer(nextReducer)
    })

    return store
}
