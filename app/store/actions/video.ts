import {Action} from "flux-standard-action"
import {createAction} from "../util"

export const SET_VIDEOID = "SET_VIDEOID"

export const setVideoId = createAction<string>(SET_VIDEOID)

export default {
    setVideoId
}
