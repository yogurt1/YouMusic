import {fromJS} from "immutable"
import {createReducer} from "../util"
import routingReducer from "./routing"
import formReducer from "./form"
import authReducer from "./auth"
import videoReducer from "./video"

export default {
    routing: routingReducer,
    form: formReducer,
    auth: authReducer,
    video: videoReducer
}
