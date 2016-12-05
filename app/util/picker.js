export default function createPicker(toPick) {
    return state => {
        const toReturn = {}
        for (const key in state) {
            if (toPick.includes(key)) {
                toReturn[key] = state[key]
            }
        }
    }
}

export function createImmutablePicker(toPick) {
    return state => state.getIn(toPick)
}

