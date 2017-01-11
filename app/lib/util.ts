export const arrayBuilder = <T>(...fns: Array<(i: number) => T | any>): Array<T> =>
    fns.map((fn, i) => fn(i))

export const xor = (a, b) => !!(a ^ b)
export const noopNull = () => null
export const noop = () => void(null)
export const thunk = f => f

export const dom = (selector: string) => {
    const el: Element = document.querySelector(selector)
    return (done: Function) => el !== null && done(el)
}

export const doms = (...selectors: string[]) => {
    const els = selectors
        .map(selector => document.querySelector(selector))
        .filter(el => el !== null)
    return (done: Function) => els.forEach(el => done(el))
}

export const getIsBrowser = () => (<any>process).browser ||
    typeof(window) === "object"
export const getDevEnv = () => process.env.NODE_ENV !== "production"
export const getProdEnv = () => process.env.NODE_ENV === "production"
export const getTestEnv = () => process.env.NODE_ENV === "test"
export const getNotDevEnv = () => !getDevEnv()
export const getNotProdEnv = () => !getProdEnv()
export const getNotTestEnv = () => !getTestEnv()
export const getWindow = () => isBrowser ? window : null

export const isBrowser = getIsBrowser()
export const isDevEnv = getDevEnv()
export const isProdEnv = getProdEnv()
export const isTestEnv = getTestEnv()
export const isNotDevEnv = getNotDevEnv()
export const isNotProdEnv = getNotProdEnv()
export const isNotTestEnv = getNotTestEnv()


// Stupid FP shit, don't use it
export const or = or => expr => expr || or
export const orTrue = expr => or(true)
export const orFalse = expr => or(false)
export const orNull = expr => or(null)

export const toString = s => Object.prototype.toString.call(s)
export const toClass = s => /\[object\s(.*)\]/gm.exec(toString(s))

export const compose = (...funcs) => (...args) =>
    funcs.reduceRight((composed, next) => next(composed),
        funcs.pop()(...args))

export const flatten = arrays => arrays.reduce((a, b) => a.concat(b))
