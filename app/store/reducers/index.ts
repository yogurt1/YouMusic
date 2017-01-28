import { Record } from "immutable"
import { Reducer } from "redux"
import routingReducer, { RoutingState } from "./routing"
import formReducer, { FormState } from "./form"
import authReducer, { AuthState } from "./auth"
import { reducer as configReducer, State as ConfigState } from "../ducks/config"
import { reducer as videoReducer, State as VideoState } from "../ducks/video"

export const records : Record < any, any > [] = []

export interface State {
    routing: RoutingState
    form: FormState
    auth: AuthState
    video: VideoState
    config: ConfigState
}

export interface ReducersRegistry {
    [key: string]: Reducer<any>
    routing: Reducer<RoutingState>
    form: Reducer<FormState>
    auth: Reducer<AuthState>
    video: Reducer<VideoState>
    config: Reducer<ConfigState>
}

const reducersRegistry : ReducersRegistry = {
    routing: routingReducer,
    form: formReducer,
    auth: authReducer,
    config: configReducer,
    video: videoReducer
}

export default reducersRegistry
