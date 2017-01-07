export const arrayBuilder = <T>(...fns: Array<(i: number) => T | any>): Array<T> =>
    fns.map((fn, i) => fn(i))

export const xor = (a, b) => !!(a ^ b)
export const noop = () => null
export const getDisplayName = c => c.displayName || c.name || "Component"
export const dom = sel => {
    const el = document.querySelector(sel)
    return cb => el ? cb(el) : void(null)
}

export const getIsBrowser = () => (<any>process).browser ||
    typeof(window) === "object"
export const getDevEnv = () => process.env.NODE_ENV !== "production"
export const getProdEnv = () => process.env.NODE_ENV === "production"
export const getTestEnv = () => process.env.NODE_ENV === "test"
export const getNotDevEnv = () => !getDevEnv()
export const getNotProdEnv = () => !getProdEnv()
export const getNotTestEnv = () => !getTestEnv()

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
