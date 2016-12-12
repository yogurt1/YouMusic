// Stupid FP shit, don't use it
export const or = or => expr => expr || or
export const orTrue = expr => or(true)
export const orFalse = expr => or(false)
export const orNull = expr => or(null)
