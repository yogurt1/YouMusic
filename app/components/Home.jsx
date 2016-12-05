import React from 'react'
import styled from 'styled-components'
import autobind from 'autobind-decorator'
import {Container, Columns} from './Grid'
import YouTube from 'react-youtube'

export default class Home extends React.Component {
    state = {
        content: ""
    }

    handleEditorChange = ev => {
        const nextContent = ev.target.getContent()
        this.setState({
            content: nextContent
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextState.content !== this.state.content
        )
    }

    handlePlayerReady = ev => {
        console.log("Player ready!")
        ev.target.pauseVideo()
    }

    handlePlayerError = ev => {
        console.log("Got player error")
    }

    render() {
        const {content} = this.state
        const [VIDEO_ID, HEIGHT, WIDTH] = ['nGt_JGHYEO4', 390, 640]
        return (
            <Container>
                <div>
                    <h3>Player:</h3>
                    <YouTube
                        videoId={VIDEO_ID}
                        opts={{height: HEIGHT, width: WIDTH}}
                        onReady={this.handlePlayerReady}
                        onError={this.handlePlayerError}
                    />
                </div>
            </Container>
        )
    }
}
