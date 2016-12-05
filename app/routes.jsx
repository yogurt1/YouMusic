import React from 'react'
import {createRoutes, Route, IndexRoute} from 'react-router'
import Layout from './components/Layout'
import Home from './components/Home'

const factory = msg => () => <h1>{msg}</h1>
const [HelloWorld, NoMatch] = [
    "Hello, world! :-) (c) K&R",
    "Not found :("
].map(factory)

export default createRoutes(
    <Route path="/" component={Layout}>
        <IndexRoute component={Home} />
        <Route path="/hw" component={HelloWorld} />
        <Route path="*" component={NoMatch} />
    </Route>
)
