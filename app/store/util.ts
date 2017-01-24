import {
    bindActionCreators,
    ActionCreator,
    Reducer,
    Dispatch
} from "redux"
import { Action, ErrorAction } from "flux-standard-action"
import { Record } from "immutable"
import { flatten } from "lodash"
import { isBrowser, isDevEnv } from "app/lib/util"
import { compose } from "redux"
import { connect } from "react-redux"

export const NORMALIZE_STATE = "app/NORMALIZE_STATE"

export const reduxify = (mapStateToProps, mapDispatchToProps?, mergeProps?, opts?) =>
    target => (connect(
        mapStateToProps, mapDispatchToProps, mergeProps, opts)
        (target) as any)


export const DEVTOOLS_COMPOSE_KEY = "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"

export const composeWithDevTools = (isBrowser && isDevEnv) &&
    window[DEVTOOLS_COMPOSE_KEY]
        ? window[DEVTOOLS_COMPOSE_KEY]
        : compose

export const memoize = fn => {
    const cache = new WeakMap()

    return Iterable => {
        let cached = cache.get(Iterable)

        if (cached) {
            return cached
        }

        const result = fn(Iterable)
        cache.set(Iterable, result)

        return result
    }
}

const getProp = (o, p) => o[p] || o.get(p)

export const pickState = tree => state => {
    const picked = {}

    for (const node of tree) {
        if (!Array.isArray(node)) {
            picked[node] = getProp(state, node)
            continue
        }

        const subNode = node[0]
        const subTree = node[1]
        const subState = getProp(state, subNode)
        const pickedState = pickState(subTree)(subState)
        picked[subNode] = pickedState
    }

    return picked
}

export const bindActions = actions => dispatch =>
    bindActionCreators(actions, dispatch)



export function createAction <T>(type: string) {
    return (payload: T) => <Action<T>>({
        type,
        payload
    })
}

export function createTypes(prefix: string, ...types: string[]): any {
    const ac = {}
    types.forEach(type => ac[type] = `${prefix}/${type}`)
    return ac
}

export function createReducer<S>(initialState: S, finalHandler?: Reducer<S>) {
    const cases = new Map<string, Reducer<S>>()
    const reducer: Reducer<S> = (state = initialState, action) => {
        const handler = cases.get(action.type)
        const nextState = !handler ? state : handler(state, action)
        return typeof(finalHandler) === "function"
            ? finalHandler(nextState, action) : nextState
    }

    Object.setPrototypeOf(reducer, {
        get(type) {
            return cases.get(type)
        },

        setFinalHandler(nextFinalHandler) {
            finalHandler = nextFinalHandler
        },

        link(type, to) {
            cases.set(type, cases.get(to))
        },

        ["case"](type, handler) {
            cases.set(type, handler)
        }
    })

    return reducer as any
}

export function ignoreReducer<R extends Reducer<any>>(reducer: R, types: { [key: string]: string }) {
    const values = Object.keys(types).map(k => types[k])
    const cmp = (type: string): boolean => !!values.find(t => t === type)

    return (state, action: { type: string, [key: string]: string }): any =>
        !cmp(action.type) ? state : reducer(state, action)
}
