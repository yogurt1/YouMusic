import {Reducer} from "redux"
import {Map} from "immutable"
import {SET_CONFIG_KEY} from "../actions/config"
import {createReducer} from "../util"

export type ConfigState = Map<string, any>
export const initialState: ConfigState = Map<string, any>()

const reducer = createReducer<ConfigState>(initialState)

reducer.case(SET_CONFIG_KEY, (state, action) => state
             .set(action.payload[0], action.payload[1]))

export default reducer
