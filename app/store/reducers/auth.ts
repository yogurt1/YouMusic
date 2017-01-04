import {Reducer} from "redux"
import {Map, fromJS} from "immutable"
import {SET_TOKEN} from "../actions/auth"
import {createReducer} from "../util"

export type AuthState = Map<string, string>
export const initialState: AuthState = Map<string, string>({
    token: null
})

const reducer = createReducer<AuthState>(initialState)
reducer.case(SET_TOKEN, (state, action) => state
             .set("token", action.payload))

export default reducer
