import "./polyfills"
import * as React from "react"
import * as ReactDOM from "react-dom"
import {AppContainer} from "react-hot-loader"
import {match} from "react-router"
import {dom, isDevEnv, isBrowser, isProdEnv} from "./lib/util"
import App, {routes, history} from "./clientApp"

const renderApp = (App, routes, history) => {
    return dom("#app")(el => match({routes, history},
        (err, _, renderProps) =>
            ReactDOM.render((
                <AppContainer>
                    <App {...renderProps} />
                </AppContainer>
            ), el)))
}

window.onload = () => {
    if (isProdEnv) {
        dom(".__CRITICAL_CSS__")(el => el.remove())
        // dom(".__BUNDLE_CSS__")(el => {
        //     el.as = "style"
        //     el.rel = "stylesheet"
        // })
    }
}

renderApp(App, routes, history)

if (isDevEnv) {
    // const {whyDidYouUpdate} = require("why-did-you-update")
    // whyDidYouUpdate(React)
    // require("offline-plugin/runtime").install()
}

const {hot} = module as any
if (hot) hot.accept(() => {
    const {
        routes: nextRoutes,
        history: nextHistory,
        default: NextApp
    } = require("./clientApp")

    renderApp(NextApp, nextRoutes, nextHistory)
})
