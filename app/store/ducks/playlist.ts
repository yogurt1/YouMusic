import { Reducer } from "redux"
import { OrderedSet, Map, Record } from "immutable"
import { createAction } from "redux-actions"
import { createSelector } from "reselect"
import { REHYDRATE } from "redux-persist/constants"
import VideoRecord from "../records/VideoRecord"

export const PREFIX = "@playlist"
export const ADD = `${PREFIX}/ADD`
export const REMOVE = `${PREFIX}/REMOVE`
export const CLEAR = `${PREFIX}/CLEAR`
export const CLEAR_PREVIOUS = `${PREFIX}/CLEAR_PREVIOUS`
export const CLEAR_NEXT = `${PREFIX}/CLEAR_NEXT`

export const actions = {
    addNext: createAction<VideoRecord>(ADD),
    remove: createAction<number>(REMOVE)
}

export type State = OrderedSet<VideoRecord>
export const initialState: State = OrderedSet<VideoRecord>()

export const reducer: Reducer<State> = (state = initialState, action) => {
    switch (action.type) {
        case ADD: return state
            .add(action.payload)
        case REMOVE: return state
            .delete(action.payload)
        case CLEAR: return state.clear()
        case REHYDRATE: return OrderedSet(state)
        default: return state
    }
}

export const selectors = {
    selectPrevious() {
    },

    selectNext() {
    },

    selectCurrent(state) {

    }
}
