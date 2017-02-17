const promiseSeries = <T>(...fns: Promise<any>[]): Promise<T> =>
    fns.reduce((promise, fn) => promise.then(fn), fns.shift())
