export default function arrayMiddleware({dispatch}) {
    return next => action => {
        if (!Array.isArray(action)) {
            return next(action)
        }

        for (const a of action) {
            dispatch(a)
        }
    }
}
