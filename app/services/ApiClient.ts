import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

export interface Response {
    [key: string]: any
}

export interface ApiClientInterface {
    request(opts: AxiosRequestConfig): Promise<Response>
}

export class RequestError
 extends Error {
    constructor(public status: number, message: string) {
        super(message)
        this.status = status
        Error.captureStackTrace(this)
    }
}

export default class ApiClient implements ApiClientInterface {
    protected axios: AxiosInstance

    static methods = {
        GET: "GET",
        POST: "POST",
        PUT: "PUT",
        DELETE: "DELETE"
    }

    constructor(apiUrl: string) {
        const config : AxiosRequestConfig = {
            baseURL: apiUrl,
            params: {},
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }

        this.axios = axios.create(config)
    }

    public async request(config) {
        const res = await this.axios.request(config)

        if (res.status < 200 || res.status > 401) {
            throw new RequestError(res.status, res.statusText)
        }

        return res.data
    }
}
