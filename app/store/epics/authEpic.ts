import { ajax } from "rxjs/observable/dom/ajax"
import { LOGIN, SET_TOKEN } from "../actions/auth"

const authEpic = action$ => action$.ofType(LOGIN)
    .flatMap(action => ajax({
        method: "POST",
        url: "/auth/login",
        body: {
            username: action.payload.username,
            password: action.payload.password
        }
    }).map(({ response }) => {
    }))
