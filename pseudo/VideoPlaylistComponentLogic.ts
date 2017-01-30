const VideoPlayer = ({ item }) => (
    <YouTube
        autoplay={0}
        videoId={item.videoId}
    />
)

@connect(state => ({ videoItem: state.get("video") }))
class VideoPlayerContainer extends React.Component {
    const { videoItem } = this.props
    render() {
        return (
            <VideoPlayerWrapper>
                <VideoPlayer item={videoItem} />
            </VideoPlayerWrapper>
        )
    }
}

class VideoPlaylistContainer extends React.Component {
    render() {
        return (
            <VideoPlaylistWrapper>
                <VideoPlaylist
                    items={items}
                    current={current}
                />
            </VideoPlaylistWrapper>
        )
    }
}

const VideoPlaylist = ({ items, selected }) => items
    .map((item, index) => (
        <VideoPlaylistItem
            item={item}
            key={index}
            selected={index === selected}
        />
    ))
