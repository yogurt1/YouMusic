import { Map, Record } from "immutable"
import { Reducer } from "redux"
import { APOLLO_STATE_KEY } from "../../lib/constants"
import routerReducer, { State as RouterState } from "./router"
import formReducer, { State as FormState } from "./form"
import authReducer, { State as AuthState } from "./auth"
import { reducer as configReducer, State as ConfigState } from "../ducks/config"
import { reducer as videoReducer, State as VideoState } from "../ducks/video"

export const records: Record<string, any>[] = []

export type State = {
    [key: string]: any,
    router: RouterState,
    form: FormState,
    auth: AuthState,
    video: VideoState,
    config: ConfigState,
}

export type ReducersRegistry =  {
    [key: string]: Reducer<any>
    router: Reducer<RouterState>,
    form: Reducer<FormState>,
    auth: Reducer<AuthState>,
    video: Reducer<VideoState>,
    config: Reducer<ConfigState>,
}

const reducersRegistry: ReducersRegistry = {
    router: routerReducer,
    form: formReducer,
    auth: authReducer,
    config: configReducer,
    video: videoReducer
}

export default reducersRegistry
