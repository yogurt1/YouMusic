export const SET_TOKEN = "SET_TOKEN"
export const AUTH_FAILURE = "AUTH_FAILURE"

export const setToken = token => ({
    type: SET_TOKEN,
    payload: {
        token
    }
})
