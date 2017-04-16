import * as transit from 'transit-immutable-js'
import { State } from '../store'
import * as constants from './constants'

export const getLocale = (): string => {
  return (
    navigator.language ||
    constants.DEFAULT_LOCALE
  )
}

export const getPreloadedState = (): State | void => {
  try {
    const { [constants.INITIAL_STATE_KEY]: json } = window

    if (typeof json !== 'object') {
      return undefined
    }

    return transit.fromJSON(JSON.parse(json))
  } catch (err) {
    return undefined
  }
}