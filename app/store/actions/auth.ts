import {Action, ActionCreator} from "redux"
// import AuthService from "app/services/AuthService"
import {createAction} from "app/store/util"

export const SET_TOKEN = "SET_TOKEN"
export const AUTH_FAILURE = "AUTH_FAILURE"
export const LOGIN = "LOGIN"

// const authService = new AuthService()

export const setToken = createAction(SET_TOKEN)

export type LogIn = any
export const logIn = body => async dispatch => {
    dispatch(loginRequest())
    const {username, password} = body
    try {
        const token = await authService.login(username, password)
        dispatch(loginSuccess(token))
    } catch(err) {
        dispatch(loginFailure(err))
    }
}

export const actions = {
    setToken,
    logIn
}
