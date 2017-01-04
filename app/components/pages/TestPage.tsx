import React from "react"
import styled from "styled-components"
import autobind from "autobind-decorator"
import {Link} from "react-router"
import {ghostButton} from "app/components/ui/GhostButton"
import {FormattedMessage} from "react-intl"
import YouTube from "react-youtube"
import {Container, Row, Column} from "app/components/ui/Grid"
import VideoIdForm from "app/components/forms/VideoIdForm"
import FA from "app/components/ui/FontAwesome"
import VideoContainer from "app/components/ui/VideoContainer"
import {connect} from "react-redux"
import {setToken} from "app/store/actions/auth"
import {setVideoId} from "app/store/actions/video"
import {pickState, bindActions} from "app/store/util"

const GhostLink = styled(Link)`${ghostButton}`

const MessageBlock = styled.span`
    color: ligthgreen;
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
            isPlayerReady: true
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
            width: "100%",
            height: "100%",
            playerVars: {
                autoplay: 0
            }
        }

        return (
            <div>
                <Container>
                    <Row>
                        <MessageBlock>
                            {isPlayerReady ? "Ready :-)" : (
                                <FA spin icon="spinner" />
                            )}
                        </MessageBlock>
                        <VideoIdForm onSubmit={this.handleSubmit} />
                    </Row>
                    <GhostLink to="/">
                        Go home
                    </GhostLink>
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
