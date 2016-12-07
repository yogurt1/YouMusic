import React from 'react'
import styled from 'styled-components'
import autobind from 'autobind-decorator'
import {connect} from 'react-redux'
import {Container, Columns} from 'app/components/ui/Grid'
import {pickState, bindActions} from 'app/store/util'
import {setToken} from 'app/store/actions/auth'
import YouTube from 'react-youtube'

const VideoWrapper = styled.div`
    border: 1px solid #333;
    width: 400;
    height: 400;
`

const mapStateToProps = pickState([
    ["video", ["videoId"]],
    ["auth", ["token"]]
])
const mapDispatchToProps = bindActions({setToken})
@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends React.Component {
    render() {
        const {auth, video} = this.props
        const opts = {
            height: '390',
            width: '390',
            playerVars: {
                autoplay: 0
            }
        }

        return (
            <Container>
                <h2>Some video:</h2>
                <YouTube
                    videoId={video.videoId}
                    opts={opts}
                />
            </Container>
        )
    }
}
