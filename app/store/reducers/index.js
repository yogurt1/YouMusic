import {fromJS} from 'immutable'
import {LOCATION_CHANGE} from 'react-router-redux'
import createReducer from '../createReducer'

const routingInitialState = fromJS({locationBeforeTransitions: null})
const routingReducer = createReducer(routingInitialState)
    .case(LOCATION_CHANGE, (s, a) => s
        .set('locationBeforeTransitions', a.payload))

export default {
    routing: routingReducer
}

