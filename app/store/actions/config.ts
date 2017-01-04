import {ActionCreator} from "redux"
import {Action} from "flux-standard-action"
import {createAction, createTypes} from "../util"

export const types = createTypes(
    "SET_CONFIG_KEY"
)

export const SET_CONFIG_KEY = types.SET_CONFIG_KEY

export const setConfigKey: ActionCreator<Action<string[]>> = (...pair: string[]) => ({
    type: types.SET_CONFIG_KEY,
    payload: pair
})

export default {
    setConfigKey
}
