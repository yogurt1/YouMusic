import React from 'react'
import styled from 'styled-components'
import autobind from 'autobind-decorator'
import {connect} from 'react-redux'
import {Container, Row, Column} from 'app/components/ui/Grid'
import YouTube from 'react-youtube'
import VideoIdForm from '../forms/VideoIdForm'
import {setToken} from 'app/store/actions/auth'
import {setVideoId} from 'app/store/actions/video'
import {pickState, bindActions} from 'app/store/util'
import FontAwesome from '../ui/FontAwesome'
import VideoContainer from "../ui/VideoContainer"

const MessageBlock = styled.span`
    color: red;
    font-size: 36px;
`
const mapStateToProps = pickState([
    ["video", ["videoId"]],
    ["auth", ["token"]]
])
const mapDispatchToProps = bindActions({setToken, setVideoId})
@connect(mapStateToProps, mapDispatchToProps)
export default class HomePage extends React.Component {
    state = {
        isPlayerReady: false
    }

    handleYouTubeReady = ev => {
        this.setState({
            isPlayReady: true
        })
    }

    handleSubmit = values => {
        const nextVideoId = values.get("videoId")
        this.props.setVideoId(nextVideoId)
    }

    render() {
        const {isPlayerReady} = this.state
        const {auth, video} = this.props
        const opts = {
            width: '100%',
            height: '100%',
            playerVars: {
                autoplay: 0
            }
        }

        return (
            <div>
                <Container>
                    <Row>
                        <Column>
                            <FontAwesome icon="pause" />
                        </Column>
                        <Column>
                            <VideoIdForm onSubmit={this.handleSubmit} /></Column>
                    </Row>
                    <VideoContainer>
                        <YouTube
                            videoId={video.videoId}
                            opts={opts}
                            onReady={this.handleYouTubeReady}
                        />
                    </VideoContainer>
               </Container>
            </div>
        )
    }
}
