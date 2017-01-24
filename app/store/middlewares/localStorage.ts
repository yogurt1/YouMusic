import { Middleware } from "redux"
import { debounce } from "lodash"
import { is } from "immutable"

const localStorageMiddleware = ({ wait = 200, key = "state" }): Middleware => {
    let prevState = null
    let isPersisting = false
    const persistState = debounce(state => {
        isPersisting = true
        if (is(prevState, state)) {
            prevState = state
            localStorage.setItem(key, JSON.stringify(state))
        }
        isPersisting = false
    }, wait)

    // window.onbeforeunload = () => {
    //     const persistedState = JSON.parse(localStorage.getItem(key))
    //     if (!is(persistedState, prevState)) {
    //         localStorage.setItem(key, JSON.stringify(prevState))
    //     }
    // }

    return ({ dispatch, getState }) => next => action => {
        persistState(getState())
        return next(action)
    }
}

export default localStorageMiddleware
