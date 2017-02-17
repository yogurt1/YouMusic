import process from "global/process"
import global from "global"
import * as R from "ramda"
import { capitalize } from "lodash"
import { InferableComponentEnhancer, hoistStatics, renderNothing } from "recompose"

const keys = [
    "NODE",
    "BROWSER",
    "DEVELOPMENT",
    "PRODUCTION"
]

export const env = R.zipObj(keys,
    R.times(R.pipe(R.add(1), R.multiply(0x1)), keys.length))

const isNotNil = R.pipe(R.isNil, R.not)
const getProcessVersion = v => R.path(["versions", v], process)
const hasProcessVersion = R.pipe(getProcessVersion, isNotNil)
const isProcessTitle = R.equals(process.title)
const isTrue = R.eqBy(Boolean, true)
const isAllTrue = R.all(isTrue)
const isAnyTrue = R.any(isTrue)

const envTests = {
    isNode: isAllTrue([
        hasProcessVersion("node"),
        isProcessTitle("node")
    ]),
    isBrowser: isAllTrue([
        R.equals(global.window, global),
        R.prop(process, "browser"),
        isProcessTitle("browser")
    ]),
    isElectron: isAllTrue([
        hasProcessVersion("electron")
    ])
}

const testEnv = (envName: string): number => {
    const formatName = R.pipe(R.toLower, capitalize)
    const test = R.prop(`is${formatName(envName)}`, envTests) as () => boolean
    return Number(test())
}
const getEnv = R.flip(R.prop)(env)
const andEachByKey = R.flip((a: string) => R.pipe(
    R.map((fn: Function) => fn()),
    R.reduce((a, b) => a && b, 1)
))

const envMask = R.pipe(
    R.keys,
    R.map(andEachByKey([testEnv, getEnv])),
    R.filter(R.pipe(R.equals(0), R.not)),
    R.reduce(R.or, 0)
)(env)

export const isEnv = R.pipe(R.reduce(R.and(envMask), 0x0), Boolean)
export const isNotEnv = R.pipe(isEnv, R.not)
export const envDecorator = (mask: number[], not?: boolean) =>
    (component: InferableComponentEnhancer): InferableComponentEnhancer =>
        (not ? isNotEnv : isEnv)(mask)
            ? component
            : hoistStatics(R.always(null))(component)
