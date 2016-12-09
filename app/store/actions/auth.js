export const SET_TOKEN = "SET_TOKEN"
export const AUTH_FAILURE = "AUTH_FAILURE"
export const LOGIN = "LOGIN"

export const setToken = token => ({
    type: SET_TOKEN,
    payload: {
        token
    }
})

export const logIn = body => async dispatch => {
    const req = new Request("/auth/login", {
        headers: new Headers({
            Accept: "application/json"
        }),
        body,
        method: "POST"
    })
    dispatch(loginRequest())

    try {
        const res = await fetch(req)

        if (!res.ok || res.status === 401) {
            throw new Error(res.statusText)
        }

        const data = await res.json()
        dispatch(loginSuccess(data))
    } catch(err) {
        dispatch(loginFailure(err))
    }
}

export const actions = {
    setToken,
    logIn
}
