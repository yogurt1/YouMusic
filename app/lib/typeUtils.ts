export const toString = v => Object.prototype.toString.call(v)
export const toClass = v => /\[object\s(.*)\]/gm.exec(toString(v))

