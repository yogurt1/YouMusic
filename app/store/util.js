const getProp = (o, p) => o[p] || o.get(p)
export const pickState = tree => state => {
    const picked = {}

    for (const node of tree) {
        if (!Array.isArray(node)) {
            picked[node] = getProp(state, node)
            continue
        }

        const subNode = node[0]
        const subTree = node[1]
        const subState = getProp(state, subNode)
        const pickedState = pickState(subTree)(subState)
        picked[subNode] = pickedState
    }

    return picked
}

// ActionCreators => dispatch ... <=> dispatch => bindActionCrreators(shape, dispatch)
export const bindActions = actions => dispatch => {
    const bindAction = fn => (...args) => dispatch(fn(...args))
    const boundActions = {}

    for (const action in actions) {
        const fn = actions[action]
        boundActions[action] = bindAction(fn)
    }

    return boundActions
}
// export const bindActions = actions => dispatch => bindActionCreators(actions, dispatch)

export const createReducer = initialState => new function() {
    const cases = {}

    this["case"] = (type, handler) => {
        if (Array.isArray(type)) {
            type.map(t => this["case"](t, handler))
            return this
        }

        if (typeof(handler) === 'string') {
            cases[type] = cases[handler]
        } else {
            cases[type] = handler
        }
        return reducer
    }

    const reducer = (state = initialState, action) => {
        const handler = cases[action.type]
        return !handler ? state : handler(state, action)
    }

    Object.setPrototypeOf(reducer, this)
    return reducer
}
