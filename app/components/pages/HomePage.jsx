import React from "react"
import styled from "styled-components"
import {Link} from "react-router"
import {Button} from "semantic-ui-react"
import {Row, Column, Container, Section} from "app/components/ui/Grid"
import {setVideoId} from "app/store/actions/video"
import {connect} from "react-redux"

const mapDispatchToProps = dispatch => ({
    setVideoId: (...args) => dispatch(setVideoId(...args))
})

const mapStateToProps = state => ({
    videoId: state.getIn(["video", "videoId"])
})

@connect(mapStateToProps, mapDispatchToProps)
export default class HomePage extends React.Component {
    static async get(ctx) {
        const {videoId} = ctx.request.query

        if (!videoId) {
            return;
        }

        const {store} = ctx.state
        store.dispatch(setVideoId(videoId))
        const state = store.getState().get("video")

        console.log(`getState()["video"]: ${state}`)
    }

    handleSubmit = ev => {
        ev.preventDefault()
        const form = new FormData(ev.taget)
        const videoId = form.get("videoId")
        this.props.setVideoId(videoId)
    }

    render() {
        return (
            <div>
                <Button as={Link} to="/test">
                    About
                </Button>
                <h1>VideoId: {this.props.videoId}</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="videoId" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
