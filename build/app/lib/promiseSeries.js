const promiseSeries = (...fns) => fns.reduce((promise, fn) => promise.then(fn), fns.shift());
//# sourceMappingURL=promiseSeries.js.map