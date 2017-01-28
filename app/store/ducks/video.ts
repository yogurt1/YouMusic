import { Map } from "immutable"
import { Reducer, Action } from "redux"
import { createTypes, NORMALIZE_STATE } from "../util"

export const prefix = "video"

export const types = createTypes(prefix,
    "SET_VIDEOID"
)

export const actions= {
    setVideoId: () => ({ type: types.SET_VIDEID })
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
