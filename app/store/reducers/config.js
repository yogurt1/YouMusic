import {Map} from 'immutable'
import {createReducer} from '../util'
import {SET_CONFIG_KEY} from '../actions/config'

const initialState = new Map()
const reducer = createReducer(initialState)

reducer.case(SET_CONFIG_KEY, (state, action) => state
    .set(action.payload.key, action.payload.value))

export default reducer
