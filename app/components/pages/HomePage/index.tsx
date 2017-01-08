import * as React from "react"
import YouTube from "react-youtube"
import VideoIdForm from "app/components/forms/VideoIdForm"
import {connect, MapStateToProps} from "react-redux"
import {autobind} from "core-decorators"
import {actions as videoActions} from "app/store/ducks/video"

export interface StateProps {
    videoId: string
}

export const mapStateToProps: MapStateToProps<StateProps, null> = state => ({
    videoId: state.get("video").get("videoId")
})

@connect(mapStateToProps, videoActions)
export default class HomePage extends React.Component<any, any> {
    componentDidMount() {
        const {videoId} = this.props.location.query
        if (videoId) {
            this.props.setVideoId(videoId)
        }
    }

    render() {
        const {videoId} = this.props
        return (
            <div style={{padding:15}}>
                <YouTube videoId={videoId} />
                <h4>Video ID: {videoId}</h4>
            </div>
        )
    }
}
