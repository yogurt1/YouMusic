import * as React from "react"
import {createRoutes, Route, IndexRoute} from "react-router"
import Layout from "./components/layout"
import HomePage from "./components/pages/HomePage"
import NoMatchPage from "./components/pages/NoMatchPage"
import TestPage from "./components/pages/TestPage"
import {isDevEnv} from "app/lib/util"

declare const System: any

if (typeof(System) === "undefined") {
    const System = {
        import(path) {
            try {
                return Promise.resolve(require(path))
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
}

const getPage = importee => (nextState, done) => importee
    .then(m => done(null, m.default || m))
    .catch(err => {
        if (isDevEnv) {
            console.log("[RR] got error: ", err.message)
        }
        done(err, null)
    })

interface VideoPageProps {
    params: {
        id: string
    }
}

const VideoPage: React.StatelessComponent<VideoPageProps> = ({params}) => (
    <div>
        <h1>{params.id}</h1>
    </div>
)

// const getLandingPage = getPage(System.import("./components/pages/LandingPage"))
// const getTestPage = getPage(System.import("./components/pages/TestPage"))

export default createRoutes(
    <Route>
        <Route path="/test" component={TestPage} />
        {/*<Route path="/promo" getComponent={getLandingPage} />*/}
        <Route path="/" component={Layout}>
            <IndexRoute component={HomePage} />
            {/*<Route path="/test" getComponent={getTestPage} />*/}
            <Route path="/video/:id" component={VideoPage} />
        </Route>
        <Route path="*" component={NoMatchPage} />
    </Route>
)
