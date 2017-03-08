import * as React from "react"
import YouTube from "react-youtube"
import { connect, MapStateToProps } from "react-redux"
import { withRouter } from "react-router"
import { withTheme } from "styled-components"
import { autobind } from "core-decorators"
import { actions as videoActions } from "app/store/ducks/video"

export interface StateProps {
    videoId: string
}

export const mapStateToProps = state => ({
    videoId: state.get("video").get("videoId")
})

const c = connect as any

@withTheme
@c(mapStateToProps)
export default class HomePage extends React.Component<any, any> {
    componentWillMount() {
        const { dispatch, location } = this.props
        // const { videoId } = location.query
        const videoId = "random"

        if (videoId) {
            dispatch(videoActions.setVideoId(videoId))
        }
    }

    render() {
        const { videoId, theme } = this.props
        return (
            <div style={{ padding: 15 }}>
                <YouTube videoId={videoId} width={800} height={600} />
                <h4 style={{ color: theme.colors.accent }}>
                    Video ID: { videoId }
                </h4>
            </div>
        )
    }
}
