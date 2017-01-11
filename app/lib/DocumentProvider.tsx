import {Context} from "koa"
import * as React from "react"
import {isBrowser} from "./util"

const voids = []

export class FakeWindow {
    constructor(ctx: Context) {
        voids.forEach(k => this[k] = void(null))
    }
}

export default function getWindow(ctx?: Context): Window | FakeWindow {
    if (isBrowser) {
        return window
    }

    return new FakeWindow(ctx)
}
