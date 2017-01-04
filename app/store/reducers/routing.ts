import {fromJS} from "immutable"
import {LOCATION_CHANGE} from "react-router-redux"
import {createReducer} from "../util"

const initialState = fromJS({
    locationBeforeTransitions: null
})

const reducer = createReducer(initialState)

reducer.case(LOCATION_CHANGE, (state, action) => state
    .set("locationBeforeTransitions", action.payload))

export default reducer
