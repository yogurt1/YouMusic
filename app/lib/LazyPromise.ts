import * as Promise from "any-promise"

export default class LazyPromise<T> implements Promise<T> {
    private fn: (resolve, reject) => void
    private promise: Promise<T>

    constructor(fn) {
        this.fn = fn
    }

    private getOrCreatePromise() {
        if (!this.promise) {
            this.promise = new Promise<T>(this.fn)
        }

        return this.promise
    }

    public all = Promise.all

    public then(onFullfill, onReject) {
        return this.getOrCreatePromise()
            .then(onFullfill, onReject)
    }

    public catch(onReject) {
        return this.getOrCreatePromise()
            .catch(onReject)
    }
}
