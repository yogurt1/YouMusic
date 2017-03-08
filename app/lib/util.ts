import * as R from "ramda"

export const toString = s => Object.prototype.toString.call(s)
export const toClass = s => /\[object\s(.*)\]/gm.exec(toString(s))

export const flatten = (array: any[]) => array
    .reduce((a, b) => a.concat(b), [])

