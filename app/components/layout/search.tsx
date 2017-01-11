import * as React from "react"
import { MapStateToProps } from "react-redux"
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

@reduxify(mapStateToProps)
export default class TopBarSearchForm extends React.Component<any, any> {
    @autobind
    private async handleSubmit(values) {
        const { dispatch } = this.props
        const keyword = values.get("keyword")
        const searchResult = await new YouTubeSearchService()
            .byKeyword(keyword)

        const [{ videoId }] = searchResult.items
        dispatch(videoActions.setVideoId(videoId))
    }

    render() {
        const {videoId} = this.props
        return (
            <VideoSearchForm onSubmit={this.handleSubmit} />
        )
    }
}
