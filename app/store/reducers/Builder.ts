import { Reducer, Action } from "redux"

interface ReducerBuilderInterface<T> {
    case(type: string, handler: Reducer<T>): ReducerBuilderInterface<T>
    build(initialState?: T): Reducer<T>
}

type Cases<T> = { [key: string]: Reducer<T> }

export default class ReducerBuilder<T> implements ReducerBuilderInterface<T> {
    private cases: Cases<T> = {}

    public case(type: string, handler: Reducer<T>): this {
        // TODO: Multiple handlers (composition)
        // TODO: Reference handler
        this.cases[type] = handler
        return this
    }

    public build(initialState?: T): Reducer<T> {
        return (state: T = initialState, action: Action) => {
            const handler: Reducer<T> = this.cases[action.type]
            return handler
                ? handler(state, action)
                : state
        }
    }
}
