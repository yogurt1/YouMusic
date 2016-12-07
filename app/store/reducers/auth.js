import {fromJS} from 'immutable'
import {createReducer} from '../util'
import {SET_TOKEN} from '../actions/auth'

const initialState = fromJS({
    token: null
})

export default createReducer(initialState)
    .case(SET_TOKEN, (state, action) => state
        .set('token', action.payload.token))
