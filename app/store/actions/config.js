export const SET_CONFIG_KEY = 'SET_CONFIG_KEY'

export const setConfigKey = (key, val) => ({
    type: SET_CONFIG_KEY,
    payload: {
        key, val
    }
})
