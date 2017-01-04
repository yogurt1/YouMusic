import * as LRU from "lru-cache"
import cash from "koa-cash"
import convert from "koa-convert"

const cache = LRU({
    maxAge: 30000
})

const middleware = () => convert(cash({
    get(key, maxAge) {
        return cache.get(key)
    },

    set(key, value) {
        cache.set(key, value)
    }
}))

export default middleware
