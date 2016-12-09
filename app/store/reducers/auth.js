import {fromJS} from "immutable"
import {createReducer} from "../util"
import {SET_TOKEN} from "../actions/auth"

const initialState = fromJS({
    token: null
})

const reducer = createReducer(initialState)
reducer.case(SET_TOKEN, (state, action) => state
    .set("token", action.payload.token))

export default reducer
