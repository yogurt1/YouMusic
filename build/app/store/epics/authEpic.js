"use strict";
const ajax_1 = require("rxjs/observable/dom/ajax");
const auth_1 = require("../actions/auth");
const authEpic = action$ => action$.ofType(auth_1.LOGIN)
    .flatMap(action => ajax_1.ajax({
    method: "POST",
    url: "/auth/login",
    body: {
        username: action.payload.username,
        password: action.payload.password
    }
}).map(({ response }) => {
}));
//# sourceMappingURL=authEpic.js.map