import { Reducer } from "redux"
import { Map, fromJS } from "immutable"
import { SET_TOKEN, RESET_TOKEN } from "../actions/auth"

export type State = Map<string, string>

const initialState: State = Map({
    token: null
})

const reducer: Reducer<State> = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN: return state
            .set("token", action.payload)
        default: return state
    }
}

export default reducer
