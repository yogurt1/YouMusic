import { Reducer } from "redux"
import { OrderedSet, Map, Record } from "immutable"
import { createAction } from "redux-actions"
import { createSelector } from "reselect"
import { createTypes, NORMALIZE_STATE } from "../util"

export const types = createTypes("playlist", [
    "ADD",
    "REMOVE",
    "CLEAR",
    "CLEAR_PREVIOUS",
    "CLEAR_NEXT"
])

export interface VideoRecord extends Map<string, string | number> {
    title: string
    videoId: string
    description: string
    publishedAt: string
    channelId: string
    channelTitle: string
}

export const actions = {
    addNext: createAction<VideoRecord>(types.ADD),
    remove: createAction<number>(types.REMOVE)
}

export type State = OrderedSet<VideoRecord>
export const initialState: State = OrderedSet<VideoRecord>()

export const reducer: Reducer<State> = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD: return state
            .add(action.payload)
        case types.REMOVE: return state
            .delete(action.payload)

        case types.CLEAR: return state.clear()

        case NORMALIZE_STATE: return OrderedSet(state)
        default: return state
    }
}

export const selectors = {
    selectPrevious() {
    },

    selectNext() {
    },

    selectCurrent() {

    },
}
