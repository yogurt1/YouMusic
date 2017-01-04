import {Reducer} from "redux"
import {fromJS} from "immutable"
import {createReducer} from "../util"
import routingReducer from "./routing"
import formReducer from "./form"
import authReducer from "./auth"
import videoReducer from "./video"

interface ReducersRegistry {
    [key: string]: Reducer<any>
}

const reducersRegistry: ReducersRegistry = {
    routing: routingReducer,
    form: formReducer,
    auth: authReducer,
    video: videoReducer
}

export default reducersRegistry
