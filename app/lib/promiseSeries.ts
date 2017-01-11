const privateMap = new WeakMap()
type PromiseFunction = () => Promise<any>

export default function PromiseSeries(...fns: PromiseFunction[]): PromiseFunction {
    return () => {
        if (fns.length === 0) {
            throw new Error("Stack is empty")
        }

        let promise = null
        while (fns.length) {
            const fn = fns.shift()

            if (!promise) {
                promise = fn()
                continue
            }

            promise = promise.then(fn)
        }

        return promise
    }
}
