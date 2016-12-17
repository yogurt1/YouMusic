import React from "react"
import {createRoutes, Route, IndexRoute} from "react-router"
import Layout from "./components/pages/Layout"
import HomePage from "./components/pages/HomePage"
import NoMatchPage from "./components/pages/NoMatchPage"

const getPage = importee => (nextState, done) => importee
    .then(m => done(null, m.default || m))
    .catch(err => done(err, null))

const VideoPage = ({params}) => (
    <h1>{params.id}</h1>
)

const getLandingPage = getPage(System.import("./components/pages/LandingPage"))
const getTestPage = getPage(System.import("./components/pages/TestPage"))

export default createRoutes(
    <Route>
        <Route path="/promo" getComponent={getLandingPage} />
        <Route path="/" component={Layout}>
            <IndexRoute component={HomePage} />
            <Route path="/test" getComponent={getTestPage} />
            <Route path="/video/:id" component={VideoPage} />
        </Route>
        <Route path="*" component={NoMatchPage} />
    </Route>
)
