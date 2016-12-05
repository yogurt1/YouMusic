import React from 'react'
import {createRoutes, Route, IndexRoute} from 'react-router'
import Home from './components/Home'

const factory = msg => () => <h1>{msg}</h1>
const [HelloWorld, NoMatch] = [
    "Hello, world! :-) (c) K&R",
    "Not found :("
].map(factory)
const Layout = ({children}) => (
    <div>
        <h1>Layout</h1>
        <hr />
        <div>{children}</div>
    </div>
)

export default createRoutes(
    <Route path="/" component={Layout}>
        <IndexRoute component={Home} />
        <Route path="/hw" component={HelloWorld} />
        <Route path="*" component={NoMatch} />
    </Route>
)
