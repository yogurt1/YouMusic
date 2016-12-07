import {fromJS} from "immutable"
import {createReducer} from "../util"
import {SET_VIDEOID} from "app/store/actions/video"

const mockVideoId = () => "SXiSVQZLje8"
const initialState = fromJS({
    videoId: mockVideoId()
})

export default createReducer(initialState)
    .case(SET_VIDEOID, (state, action) => state
        .set("videoId", action.payload.videoId))
