import { Map } from "immutable"
import { Reducer, Action } from "redux"
// import { FluxStandardAction as Action } from "flux-standard-action"
import { createTypes } from "../util"
import { createSelector } from "reselect"

export const types = createTypes(
    "SET_CONFIG_KEY"
)

interface A<T> extends Action {
    payload: T
}

export type K = string | symbol
export type V = string | number | boolean

export const actions = {
    setConfigKey(k: K, v: V): A<[ K, V ]> {
        return {
            type: types.SET_CONFIG_KEY,
            payload: [ k, v ]
        }
    }
}

export type State = Map<string, string>
export const initialState: State = Map<string, string>()

export const reducer: Reducer<State> = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_CONFIG_KEY: return state
            .set(action.payload[0], action.payload[1])
        default: return state
    }
}

export const selectors = {
    selectAll: () => state => state.get("config"),
    selectKey: (key: string) => createSelector(
        selectors.selectAll(),
        state => state.get(key))

}
