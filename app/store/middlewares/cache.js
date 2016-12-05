// import localforage from 'localforage'

export default function cacheMiddleware({dispatch}) {
    return next => action => {
        return next(action)
    }
}
