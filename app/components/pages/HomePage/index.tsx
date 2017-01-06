import * as React from "react"
import styled from "styled-components"
import {Link} from "react-router"
import YouTube from "react-youtube"
import {Button, Form, Input, FormGroup, Label} from "reactstrap"
import {ActionCreator} from "redux"
import {connect, MapStateToProps} from "react-redux"
import {autobind} from "core-decorators"
import {actions as videoActions} from "app/store/ducks/video"

export interface StateProps {
    videoId: string
}

export interface DispatchProps {
    setVideoId?: ActionCreator<any>
}

export const mapStateToProps: MapStateToProps<StateProps, null> = state => ({
    videoId: state.get("video").get("videoId")
})

@connect(mapStateToProps, videoActions)
export default class HomePage extends React.Component<any, any> {
    @autobind
    private handleSubmit(ev) {
        ev.preventDefault()
        const formData = new FormData(ev.target) as any
        const videoId = formData.get("videoId")
        this.props.setVideoId(videoId)
    }

    render() {
        const {videoId} = this.props
        return (
            <div style={{padding:15}}>
                <YouTube videoId={videoId} />
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="videoId">Video id</Label>
                        <Input type="text" name="videoId" />
                    </FormGroup>
                    <Button type="submit">OK</Button>
                </Form>
            </div>
        )
    }
}
