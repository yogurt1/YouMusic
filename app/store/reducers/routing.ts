import {Reducer} from "redux"
import {Map} from "immutable"
import {LOCATION_CHANGE} from "react-router-redux"

export type RoutingState = Map<string, any>
export const initialState = Map<string, any>({
    locationBeforeTransitions: null
})

const reducer: Reducer<RoutingState> = (state = initialState, action) => {
    switch(action.type) {
        case LOCATION_CHANGE: return state
            .set("locationBeforeTransitions", action.payload)
        default: return state
    }
}

export default reducer
