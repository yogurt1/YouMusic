import {Reducer} from "redux"
import routingReducer, {RoutingState} from "./routing"
import formReducer, {FormState} from "./form"
import authReducer, {AuthState} from "./auth"
import videoReducer, {VideoState} from "./video"
import configReducer, {ConfigState} from "./config"

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

const reducersRegistry: ReducersRegistry = {
    routing: routingReducer,
    form: formReducer,
    config: configReducer,
    auth: authReducer,
    video: videoReducer
}

export default reducersRegistry
