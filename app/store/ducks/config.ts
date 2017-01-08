import {Action} from "flux-standard-action"
import {Map} from "immutable"
import {Reducer} from "redux"
import {createReducer, createAction, createTypes} from "../util"
import {createSelector} from "reselect"

export const types = createTypes(
    "SET_CONFIG_KEY"
)

export const actions = {
    setConfigKey: (...pair: string[]): Action<string[]> => ({
        type: types.SET_CONFIG_KEY,
        payload: pair
    })
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
