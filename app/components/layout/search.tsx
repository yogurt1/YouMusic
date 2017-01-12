import * as React from "react"
import { MapStateToProps } from "react-redux"
import { withRouter } from "react-router"
import { autobind } from "core-decorators"
import VideoSearchForm from "app/components/forms/VideoSearchForm"
import YouTubeSearchService from "app/services/youtube/search"
import { actions as videoActions } from "app/store/ducks/video"
import { reduxify } from "app/store/util"

export interface StateProps {
    videoId: string
}

export const mapStateToProps: MapStateToProps<StateProps, null> = state => ({
    videoId: state.get("video").get("videoId")
})

@withRouter
@reduxify(mapStateToProps)
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

        const [{ videoId }] = searchResult.items
        // dispatch(videoActions.setVideoId(videoId))

        router.push(`/?videoId=${videoId}`)
    }

    componentDidMount() {
        this.youTubeSearchService = new YouTubeSearchService()
    }

    render() {
        const {videoId} = this.props
        return (
            <VideoSearchForm onSubmit={this.handleSubmit} />
        )
    }
}
