import styled from "styled-components"

const VideoContainer = styled.div`
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px;
    height: 0;
    overflow: hidden;
    margin-top: 10px;

    & > span > iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`

VideoContainer.displayName = "VideoContainer"
export default VideoContainer
