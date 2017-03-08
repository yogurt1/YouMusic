import { Location } from "history"
import { Reducer, Action } from "redux"
import * as R from "ramda"
import { ROUTING_STATE_KEY } from "app/lib/constants"

export const CALL_HISTORY_METHOD = "@routing/CALL_HISTORY_METHOD"
export const LOCATION_CHANGE = "@routing/LOCATION_CHANGE"

const callHistoryMethod = (method: String) => {
    return (...args: any[]) => ({
        type: CALL_HISTORY_METHOD,
        payload: { method, args }
    })
}

export const actions = R.reduce(
    (ac, method) => R.assoc(method, ac, callHistoryMethod(method)),
    Object.create(null),
    ["push", "replace", "go", "goBack", "goBack"],
)

export type State = Location

export const reducer: Reducer<State> = (state, action) => {
    switch (action.type) {
        case LOCATION_CHANGE: return action.payload
        default: return state
    }
}

export const selectors = {
    getLocation: state => state.get(ROUTING_STATE_KEY)
}
