import { Map } from "immutable"
import { Reducer, Action } from "redux"
import { REHYDRATE } from "redux-persist/constants"
import { createAction } from "redux-actions"
import { createTypes } from "../util"
// import VideoRecord from "../records/VideoRecord"

export const types = createTypes("video", [
    "SET_VIDEOID"
])

export const actions = {
    setVideoId: createAction<string>(types.SET_VIDEOID)
}

const fake = {
    videoId: () => "qMwcsIY1GYE"
}

export type State = Map<string, string>
export const initialState: State = Map({
    videoId: fake.videoId()
})

export const reducer: Reducer<State> = (state = initialState, action) => {
    switch (action.type) {
    case types.SET_VIDEOID: return state
            .set("videoId", action.payload)
    default: return state
    }
}
