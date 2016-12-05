import {addQueryMerging} from 'apollo-client'

@addQueryMerging
export default class YouTubeInterface {
    async query(ctx) {
        const {query, variables, debugName} = ctx
        return {
            data: {},
            errors: [
                {
                    code: 0,
                    msg: 'errorMsg'
                }
            ]
        }
    }
}
