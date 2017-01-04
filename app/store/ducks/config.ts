import {Action} from "flux-standard-action"
import {Map} from "immutable"
import {createReducer, createAction, createTypes} from "../util"

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

export const reducer = createReducer(initialState)
    .case(types.SET_CONFIG_KEY,
          (s, { payload: [k, v] }) => s.set(k, v))

