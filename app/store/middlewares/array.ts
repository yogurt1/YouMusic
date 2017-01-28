import { Middleware, Action } from "redux"

export type ArrayAction = Action[]

const arrayMiddleware: Middleware = ({ dispatch }) => next => action => {
    if (!Array.isArray(action)) {
        return next(action)
    }

    for (const a of action) {
        dispatch(a)
    }

}

export default arrayMiddleware
