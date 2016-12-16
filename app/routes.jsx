import React from "react"
import {createRoutes, Route, IndexRoute} from "react-router"
import Layout from "./components/pages/Layout"
import HomePage from "./components/pages/HomePage"
import LandingPage from "./components/pages/LandingPage"
import NoMatchPage from "./components/pages/NoMatchPage"

const factory = msg => () => <h1>{msg}</h1>

export default createRoutes(
    <Route>
        <Route path="/promo" component={LandingPage} />
        <Route path="/" component={Layout}>
            <IndexRoute component={HomePage} />
        </Route>
        <Route path="*" component={NoMatchPage} />
    </Route>
)
