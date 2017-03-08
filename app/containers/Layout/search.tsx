import * as React from "react"
import * as R from "ramda"
import { connect, MapStateToProps } from "react-redux"
import { withRouter } from "react-router"
import { autobind } from "core-decorators"
import VideoSearchForm from "app/containers/forms/VideoSearchForm"
import YouTubeSearchService from "app/services/youtube/search"
import { actions as videoActions } from "app/store/ducks/video"


type StateProps = { videoId: string }

const mapStateToProps: MapStateToProps<StateProps, null> = state => ({
    videoId: state.get("video").get("videoId")
})

const c = connect as any
const firstVideoId = R.pipe(
    R.prop("items"),
    R.take(1),
    R.prop("videoId")
)

@withRouter
@c(mapStateToProps)
export default class TopBarSearchForm extends React.Component<any, any> {
    private youTubeSearchService: YouTubeSearchService

    @autobind
    private async handleSubmit(values) {
        const { router, dispatch } = this.props
        const keyword = values.get("keyword")
        const searchResult = await this.youTubeSearchService
            .byKeyword(keyword)

        // const videoId = this.youTubeSearchService
        //     .feelingLucky(searchResult)

        const videoId = firstVideoId(searchResult)

        router.push({
            pathname: "/",
            query: { videoId }
        })
        dispatch(videoActions.setVideoId(videoId))
    }

    componentDidMount() {
        this.youTubeSearchService = new YouTubeSearchService()
    }

    render() {
        const { videoId } = this.props
        return (
            <VideoSearchForm onSubmit={this.handleSubmit} />
        )
    }
}
