import {Reducer} from "redux"
import {Map} from "immutable"
import {SET_VIDEOID} from "../actions/video"
import {createReducer} from "../util"

const fakeVideoId = () => "SXiSVQZLje8"

export type VideoState = Map<string, string>
export const initialState: VideoState = Map({
    videoId: fakeVideoId()
})

const reducer = createReducer<VideoState>(initialState)

reducer.case(SET_VIDEOID, (state, action) => state
             .set("videoId", action.payload))

export default reducer
