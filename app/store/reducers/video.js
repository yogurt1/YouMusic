import {fromJS} from "immutable"
import {createReducer} from "../util"
import {SET_VIDEOID} from "../actions/video"

const mockVideoId = () => "SXiSVQZLje8"
const initialState = fromJS({
    videoId: mockVideoId()
})
const reducer = createReducer(initialState)

reducer.case(SET_VIDEOID, (state, action) => state
    .set("videoId", action.payload.videoId))

export default reducer
