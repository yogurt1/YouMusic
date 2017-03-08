import { Map } from "immutable"
import { Reducer } from "redux"
import { createAction } from "redux-actions"
import { createSelector } from "reselect"
// import { prefixed } from "../util"

export const PREFIX = "@config"
export const SET_CONFIG_KEY = "@config/SET_CONFIG_KEY"

export type K = string | symbol
export type V = string | number | boolean

export const actions = {
    setConfigKey: createAction<[K, V]>(SET_CONFIG_KEY)
}

export type State = Map<K, V>
export const initialState: State = Map<K, V>()

export const reducer: Reducer<State> = (state = initialState, action) => {
    switch (action.type) {
    case SET_CONFIG_KEY:
        const [ k, v ] = action.payload
        return state.set(k, v)
    default: return state
    }
}

export const selectors = {
    selectAll() {
        return state => state.get("config")
    },

    selectKey(key: string) {
        return createSelector(
            selectors.selectAll(),
            state => state.get(key)
        )
    }

}
