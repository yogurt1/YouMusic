import {
    compose,
    Reducer,
    Dispatch
} from "redux"
import { FluxStandardAction } from "flux-standard-action"
import { isBrowser, isDevEnv } from "app/lib/util"
import { connect } from "react-redux"

export const NORMALIZE_STATE = "app/NORMALIZE_STATE"

export const reduxify = (mapStateToProps, mapDispatchToProps?, mergeProps?, opts?) =>
    target => (connect(
        mapStateToProps, mapDispatchToProps, mergeProps, opts)
        (target) as any)


const DEVTOOLS_COMPOSE_KEY = "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"
export const composeWithDevTools = (isBrowser && isDevEnv) &&
    window[DEVTOOLS_COMPOSE_KEY]
        ? window[DEVTOOLS_COMPOSE_KEY]
        : compose

export const createTypes = (prefix: string, ...types: string[]): any => {
    const shape = Object.create(null)
    types.forEach(type => shape[type] = `${prefix}/${type}`)
    return shape
}

