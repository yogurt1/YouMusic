import { compose, Action as A } from "redux"
import { isBrowser, isDevEnv } from "app/lib/util"
import { connect } from "react-redux"

export const NORMALIZE_STATE = "app/NORMALIZE_STATE"

export const reduxify = (...args) => target =>
    (connect as any)(...args)(target)

const DEVTOOLS_COMPOSE_KEY = "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"
export const composeWithDevTools = (isBrowser && isDevEnv) &&
    window[DEVTOOLS_COMPOSE_KEY]
        ? window[DEVTOOLS_COMPOSE_KEY]
        : compose

export const createTypes = (prefix: string, ...types: string[]): any =>
    types.reduce((ac, type) => (ac[type] = `${prefix}/${type}`, ac), {})

export interface Action<T> extends A {
    payload: T
    meta?: T | any
    error?: boolean
}

// export const bindActionCreators = (actionCreators: { [key: string]: ActionCreator }) =>
//     (dispatch: Dispatch) => Object.keys(actionCreatorss)
//         .reduce((v, k) =>
//                 (v[k] = (...args) => dispatch(actionCreators[k]), v), {})
