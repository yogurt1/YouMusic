// Stupid FP shit, don't use it
export const or = or => expr => expr || or
export const orTrue = expr => or(true)
export const orFalse = expr => or(false)
export const orNull = expr => or(null)

export const toString = s => Object.prototype.toString.call(s)
export const toClass = s => /\[object\s(.*)\]/gm.exec(toString(s))
