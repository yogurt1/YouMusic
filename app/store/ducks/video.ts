import { Map } from "immutable"
import { Action } from "flux-standard-action"
import { Reducer } from "redux"
import { createAction, createTypes, NORMALIZE_STATE } from "../util"

export const prefix = "video"

export const types = createTypes(prefix,
    "SET_VIDEOID"
)

export const actions= {
    setVideoId: createAction<string>(types.SET_VIDEOID)
}

const fake = {
    videoId: () => "n3osLacrd_c"
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
