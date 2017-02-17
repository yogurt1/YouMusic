import * as React from "react"
import { Route } from "react-router-web"
import Layout from "./components/layout"
import HomeScene from "./scenes/HomeScene"
import NoMatchScene from "./scenes/NoMatchScene"
// import TestScene from "./scenes/Test"

declare const System: any
if (typeof System === "undefined") {
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

const VideoScene: React.StatelessComponent<{
    params: { id: string }
}> = ({ params }) => (
    <div><h1>{ params.id }</h1></div>
)

export default class Root extends React.Component<null, null> {
    render () {
        return (
            <Layout>
                <Route exact path="/" component={HomeScene} />
                <Route path="/video/:id" component={VideoScene} />
                <Route component={NoMatchScene} />
            </Layout>
        )
    }
}
