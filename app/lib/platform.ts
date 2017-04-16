import * as global from "global"
import * as process from "global/process"

export default {
    get isNode() {
        // TODO: Should be true if Electron?
        return process.title === "node"
    },

    get isBrowser() {
        return global['window'] === global
    },

    get isElectron() {
      const { versions } = process
      return (
        typeof versions === 'object' &&
        'electron' in versions
      )
    },

    get isReactNative() {
        return typeof global['__fbBatchedBridgeConfig'] !== "undefined"
    },

    get isProd() {
        return process.env.NODE_ENV === 'production'
    },

    get isTest() {
        return process.env.NODE_ENV === 'test'
    },

    get isDev() {
        return !(this.isProd || this.isTest)
    }
}
