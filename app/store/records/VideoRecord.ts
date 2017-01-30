import { Map, Record } from "immutable"

const R = Record<{
    title: string
    description: string
    videoId: string
    publishedAt: string
}>({
    title: "",
    description: "",
    videoId: "",
    publishedAt: ""
}, "VideoRecord")

export default VideoRecord
