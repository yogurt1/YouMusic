import * as React from "react"
import YouTube from "react-youtube"
import {Button, Form, Input, FormGroup, Label} from "reactstrap"
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
    @autobind
    private handleSubmit(values) {
        const videoId = values.get("videoId")
        this.props.setVideoId(videoId)
    }

    render() {
        const {videoId} = this.props
        return (
            <div style={{padding:15}}>
                <YouTube videoId={videoId} />
                <VideoIdForm onSubmit={this.handleSubmit} />
            </div>
        )
    }
}
