import {ActionCreator} from "redux"
import {Action} from "flux-standard-action"
// import AuthService from "app/services/AuthService"
import {createAction} from "app/store/util"

export const SET_TOKEN = "SET_TOKEN"
export const AUTH_FAILURE = "AUTH_FAILURE"
export const LOGIN = "LOGIN"


export const setToken = createAction<string>(SET_TOKEN)
// export const loginSuccess = createAction<string>(AUTH_SUCCESS)


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

