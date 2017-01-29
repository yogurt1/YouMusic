import { createAction } from "redux-actions"
// import AuthService from "app/services/AuthService"

export const SET_TOKEN = "SET_TOKEN"
export const AUTH_FAILURE = "AUTH_FAILURE"
export const LOGIN = "LOGIN"

export const setToken = createAction<string>(SET_TOKEN)
export const login = createAction<void>(LOGIN)
export const authFailure = createAction<void>(AUTH_FAILURE)

const fakeToken = () => "random token"

// export const logIn = body => async dispatch => {
//     dispatch(loginRequest())
//     const {username, password} = body
//     try {
//         // const token = await authService.login(username, password)
//         const token = await fakeToken()
//         dispatch(loginSuccess(token))
//     } catch(err) {
//         dispatch(loginFailure(err))
//     }
// }

