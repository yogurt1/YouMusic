import { Map } from "immutable"
import { Reducer } from "redux"
import { createAction } from "redux-actions"
import { createSelector } from "reselect"
import { createTypes } from "../util"

export const types = createTypes(
    "SET_CONFIG_KEY"
)

export type K = string | symbol
export type V = string | number | boolean

export const actions = {
    setConfigKey: createAction<[K, V]>(types.SET_CONFIG_KEY)
}

export type State = Map<K, V>
export const initialState: State = Map<K, V>()

export const reducer: Reducer<State> = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_CONFIG_KEY:
            const [ k, v ] = action.payload
            return state.set(k, v)
        default: return state
    }
}

export const selectors = {
    selectAll: () => state => state.get("config"),
    selectKey: (key: string) => createSelector(
        selectors.selectAll(),
        state => state.get(key))

}
