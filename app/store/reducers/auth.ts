import { Reducer } from "redux"
import { Map, fromJS } from "immutable"
import { SET_TOKEN } from "../actions/auth"

export type AuthState = Map<string, string>
export const initialState: AuthState = Map<string, string>({
    token: null
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_TOKEN: return state
            .set("token", action.payload)
    default: return state
    }
}

export default reducer
