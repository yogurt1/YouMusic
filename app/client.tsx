import "./polyfills"
import * as React from "react"
import * as ReactDOM from "react-dom"
import {AppContainer} from "react-hot-loader"
import Root from "./Root"
import {dom, isDevEnv, isBrowser, isProdEnv} from "./lib/util"

if (isDevEnv) {
    // const {whyDidYouUpdate} = require("why-did-you-update")
    // whyDidYouUpdate(React)
    // require("offline-plugin/runtime").install()
}

// const renderApp = () => match({routes, history},
//     (err, _, renderProps) => ReactDOM.render(
//         <AppContainer>
//             <App {...renderProps} />
//         </AppContainer>, target))

const target = document.querySelector("#app")
const renderApp = Root => ReactDOM.render(
    <AppContainer>
        <Root />
    </AppContainer>, target
)

renderApp(Root)

window.onload = () => {
    dom(".__CRITICAL_CSS__")(el => el.remove())
}

const {hot} = module as any
if (hot) hot.accept()
