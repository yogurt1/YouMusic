import * as React from "react"
import { withRouter, Route } from "react-router"
import Layout from "./Layout"
import HomePage from "./pages/HomePage"
import NoMatchPage from "./pages/NoMatchPage"
import { connect, MapStateToProps } from "react-redux"

const VideoPage: React.StatelessComponent<{
    match: { params: { videoId: string } }
}> = ({ match }) => (
    <div>
        <h1>{match.params.videoId}</h1>
    </div>
)

export type State = {}

// const mapStateToProps: MapStateToProps<StateProps, Props> = state => ({})

// @connect(mapStateToProps)
@withRouter
export default class App extends React.Component<any, State> {
    state = {}

    componentWillMount () {
        // const { dispatch } = this.props
        // dispatch(authenticateUser())
    }

    render () {
        const { location } = this.props
        return (
            <Layout>
                <Route exact path="/" component={HomePage} />
                <Route path="/video/:videoId" component={VideoPage} />
                <Route component={NoMatchPage} />
            </Layout>
        )
    }
}
