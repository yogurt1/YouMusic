// import * as localforage from "localforage"
import ApiClient from "./ApiClient"

export type Token = string

export interface AuthServiceInterface {
    getToken(): Promise<Token>
    logIn(username: string, password: string): void
    logOut(token: Token): void
}

export default class AuthService implements AuthServiceInterface {
    private token: Token
    private client: ApiClient
    private scope = {
    }

    constructor() {
        this.client = new ApiClient("https://www.googleapis.com/oauth2/youtube")
    }

    public async getToken() {
        const persistedToken = localStorage.getItem("token")
        return persistedToken
    }

    public async setToken(token) {

    }

    public async logIn(username, password) {
        const token = ""
        return token
    }

    public async logOut(token: Token) {

    }
}
