import { Map, fromJS } from 'immutable'
import { Reducer } from 'redux'
import { createAction } from 'redux-actions'
import { createSelector } from 'reselect'
import * as R from 'ramda'
import { lensProp as lensPropImmutable } from 'ramda-immutable'

const PREFIX = '@config'
export const SET_CONFIG_KEY = `${PREFIX}/SET_CONFIG_KEY`
export const SET_CONFIG_KEYS = `${PREFIX}/SET_CONFIG_KEYS`

export type K = string | symbol
export type V = string | number | boolean

export const actions = {
    setConfigKey: createAction<[K, V]>(SET_CONFIG_KEY),
    setConfigKeys: createAction<{ [key: string]: any }>(SET_CONFIG_KEYS)
}

export type State = Map<K, V>
export const initialState: State = Map<K, V>()

export const reducer: Reducer<State> = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONFIG_KEY:
            const [ k, v ] = action.payload
            return state.set(k, v)
        case SET_CONFIG_KEYS:
            return state.mergeDeep(fromJS(action.payload))
        default: return state
    }
}

export const selectors = (() => {
    const configLens = lensPropImmutable('config')
    const selectAll = R.view(configLens)
    const selectKey = R.curry((key: string, state: Map<K, V>) => R.view(
        R.lensProp(key),
        selectAll(state)
    ))

    return {
        selectAll,
        selectKey
    }
})()

