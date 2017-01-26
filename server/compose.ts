import * as Koa from "koa"

const compose = (...mws: Koa.Middleware[]) =>
    (ctx, next) => {
        const dispatch = async i => {
            const mw = mws[i] || next
            return mw(ctx, () => dispatch(i + 1))
        }

        return dispatch(0)
    }

export default compose
