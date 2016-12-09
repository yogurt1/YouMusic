import {reducer as formReducer} from "redux-form/immutable"
import {createReducer} from "../util"
import {AUTH_FAILURE} from "../actions/auth"

const loginReducer = createReducer()

loginReducer.case(AUTH_FAILURE, (state, action) => state
    .setIn(["fields", "password"], void 0)
    .setIn(["values", "password"], void 0))


const reducer = formReducer.plugin({
    login: loginReducer
})

export default reducer
