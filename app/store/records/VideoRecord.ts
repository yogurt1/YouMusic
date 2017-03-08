import { Record } from "immutable"

export type VideoItem = {
    title: string
    description: string
    videoId: string
    publishedAt: string
}

const VideoRecord = Record({
    title: "",
    description: "",
    videoId: "",
    publishedAt: ""
}, "VideoRecord")

export default VideoRecord
