import React from 'react'
import {createRoutes, Route, IndexRoute} from 'react-router'
import Layout from './components/ui/Layout'
import HomePage from './components/pages/HomePage'

const factory = msg => () => <h1>{msg}</h1>
const [HelloWorld, NoMatch] = [
    "Not found :("
].map(factory)

export default createRoutes(
    <Route path="/" component={Layout}>
        <IndexRoute component={HomePage} />
        <Route path="*" component={NoMatch} />
    </Route>
)
