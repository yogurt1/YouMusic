export const PUBSUB_SUBSCRIBE = 'PUBSUB_SUBSCRIBE'

export const subscribe = listener => ({
    type: PUBSUB_SUBSCRIBE,
    listener
})

export const unsubscribe = listener => ({
    type: PUBSUB_UNSUBSCRIBE,
    listener
})

export const observer = listener => dispatch => {
    subscribe(listener)
}
