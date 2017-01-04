import {bindActionCreators, ActionCreator, Reducer, Dispatch} from "redux"
import {Action, ErrorAction} from "flux-standard-action"
import {Record} from "immutable"
import {flatten} from "lodash"

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

export const createAction = <T>(type: string) =>
    (payload: T) =>
        <Action<T>>({type, payload})

        export function createReducer<S>(initialState: S): Reducer<S> {
    const cases = new Map()

    const reducer: Reducer<S> = (state = initialState, action: Action<S>) => {
        const handler = cases[action.type]
        return !handler ? state : handler(state, action)
    }

    Object.setPrototypeOf(reducer, {
        ["case"](type: string | string[], handler: string | Reducer<S>): Reducer<S> {
            if (Array.isArray(type)) {
                const _case = this["case"]
                type.forEach(t => _case(t, handler))
                return reducer
            }

            cases.set(type, typeof(handler) !== "string"
                ? handler : cases.get(handler))

            return reducer
        }
    })

    return reducer
}

