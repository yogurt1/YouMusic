import React from 'react'
import {createRoutes, Route, IndexRoute} from 'react-router'
import Layout from './components/pages/Layout'
import HomePage from './components/pages/HomePage'
import LandingPage from './components/pages/LandingPage'

const factory = msg => () => <h1>{msg}</h1>
const [HelloWorld, NoMatch] = [
    "Not found"
].map(factory)

export default createRoutes(
    <Route>
        <Route path="/promo" component={LandingPage} />
        <Route path="/" component={Layout}>
            <IndexRoute component={HomePage} />
        </Route>
        <Route path="*" component={NoMatch} />
    </Route>
)
