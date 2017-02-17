// TODO: YouTubeService :-)
import * as querystring from "querystring"
import ApiClient, {
    ApiClientInterface,
    Response
} from "../ApiClient"
const config = require("../../config")
export { default as YouTubeSearchService } from "./search"

export { Response }

export interface YouTubeRequestParams {
    key: string,
    part: string,
    [key: string]: string | number | boolean
}

export interface YouTubeServiceInterface extends ApiClientInterface {
    setParam(key: string | YouTubeRequestParams, val?: any): YouTubeServiceInterface
    setHeader(key: string | {
        [key: string]: string
    }, val?: string): YouTubeServiceInterface
}

export default class YouTubeService extends ApiClient implements YouTubeServiceInterface {
    private params: YouTubeRequestParams
    private headers: { [key: string]: string }

    constructor(apiKey?: string) {
        super(config.youtube.API_URL)

        this.headers = this.axios.defaults.headers
        this.params = this.axios.defaults.params

        this.setParam({
            key: apiKey || config.youtube.API_KEY
        })
    }

    private forOwnEntries(obj: Object, done: (k: string, v: any) => void) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                done(key, obj[key])
            }
        }
    }

    public setParam(key, val?) {
        if (typeof (key) === "object") {
            this.forOwnEntries(key, (k, v) => this.params[k] = v)
        } else {
            this.params[key] = val
        }

        return this
    }

    public setHeader(key, val?) {
        if (typeof (key) === "object") {
            this.forOwnEntries(key, (k, v) => this.headers[k] = v)
        } else {
            this.params[key] = val
        }

        return this
    }
}
