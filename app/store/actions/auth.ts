import { createAction } from "redux-actions"
// import AuthService from "app/services/AuthService"

export const SET_TOKEN = "SET_TOKEN"
export const RESET_TOKEN = "RESET_TOKEN"
export const REFRESH_TOKEN = "REFRESH_TOKEN"
export const CLEAR_TOKEN = "CLEAR_TOKEN"
export const AUTH_FAILURE = "AUTH_FAILURE"
export const LOGIN = "LOGIN"

export const setToken = createAction<string>(SET_TOKEN)
export const login = createAction<void>(LOGIN)
export const authFailure = createAction<void>(AUTH_FAILURE)

const fakeToken = () => "random token"

export const logIn = body => async dispatch => {
    // const authService = new AuthService()
    const authService = { logIn: () => null } as any
    const { username, password } = body
    authService.logIn(username, password)

    try {
        // const token = await authService.login(username, password)
        const token = await fakeToken()
        dispatch(setToken(token))
    } catch (err) {
        dispatch(authFailure(err))
    }
}

