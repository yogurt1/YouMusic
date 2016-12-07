const isPubSubAction = action => /PUBSUB_/.test(action.type)

export default function PubSubMiddleware(subscribers) {
    return ({dispatch}) => next => async action => {
        if (!isPubSubAction(action)) {
            return next(action)
        }

        for (const subscriber of subscribers) {
            await subscriber(action)
        }
        dispatch(action)
    }
}
