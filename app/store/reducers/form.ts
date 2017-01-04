import {Reducer} from "redux"
import {reducer as formReducer, FormState, FormReducer} from "redux-form/immutable"
import {AUTH_FAILURE} from "../actions/auth"

export {FormState}

export const loginReducer: Reducer<FormState> = (state, action) => {
    switch(action.type) {
        case AUTH_FAILURE: return state
            .setIn(["fields", "pasword"], void(0))
            .setIn(["values", "password"], void(0))
        default: return state
    }
}

const reducer: FormReducer = formReducer.plugin({
    login: loginReducer
})

export default reducer
