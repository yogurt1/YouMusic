import { Middleware } from "redux"
import { History } from "history"
import { CALL_HISTORY_METHOD } from "../ducks/routing"

export default (history: History): Middleware => store => {
    let lastState = store.getState("routing")
    return next => action => {
        if (action.type !== CALL_HISTORY_METHOD) {
            return next(action)
        }

        const { method, args } = action.payload
        history[method](...args)
    }
}
