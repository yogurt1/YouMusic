import { Map } from "immutable"
import { Reducer } from "redux"
import { Location } from "history"
import { LOCATION_CHANGE } from "react-router-redux"

export type State = Map<string, Location>

const initialState: State = Map({
    location: null
})

const reducer: Reducer<State> = (state = initialState, action) => {
    switch (action.type) {
        case LOCATION_CHANGE: return state
            .set("location", action.payload)
        default: return state
    }
}

export default reducer
