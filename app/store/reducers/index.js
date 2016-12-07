import {fromJS} from "immutable"
import {createReducer} from "../util"
import routingReducer from "./routing"
import authReducer from "./auth"
import videoReducer from "./video"

export default {
    routing: routingReducer,
    auth: authReducer,
    video: videoReducer
}
