import { Map, Record } from "immutable"
import { Reducer } from "redux"
import formReducer, { FormState } from "./form"
import authReducer, { AuthState } from "./auth"
// import { reducer as routingReducer, State as RoutingState } from "../ducks/routing"
import { reducer as configReducer, State as ConfigState } from "../ducks/config"
import { reducer as videoReducer, State as VideoState } from "../ducks/video"

export const records: Record<any, any>[] = []

export type State = {
    apollo: any,
    // routing: RoutingState
    form: FormState
    auth: AuthState
    video: VideoState
    config: ConfigState
}

export interface ReducersRegistry {
    [key: string]: Reducer<any>
    // routing: Reducer<RoutingState>
    form: Reducer<FormState>
    auth: Reducer<AuthState>
    video: Reducer<VideoState>
    config: Reducer<ConfigState>
}

const reducersRegistry : ReducersRegistry = {
    // routing: routingReducer,
    form: formReducer,
    auth: authReducer,
    config: configReducer,
    video: videoReducer
}

export default reducersRegistry
