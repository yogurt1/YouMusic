import { Reducer } from "redux"
import { reducer as formReducer, FormState as State, FormReducer } from "redux-form/immutable"
import { AUTH_FAILURE } from "../actions/auth"

export { State }

const loginReducer: Reducer<State> = (state, action) => {
    switch (action.type) {
        case AUTH_FAILURE: return state
            .mergeDeep({
                fields: { password: void 0 },
                values: { password: void 0 },
            })
        default: return state
    }
}

const reducer: FormReducer = formReducer.plugin({
    login: loginReducer
})

export default reducer
