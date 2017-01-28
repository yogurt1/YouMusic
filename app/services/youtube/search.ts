import YouTubeService, { Response } from "./"
import { pick } from "lodash"

export interface VideoItem {
    videoId: string,
    channelId: string,
    channelTitle: string,
    title: string,
    description: string,
    publishedAt: string,
    [key: string]: string
}

export enum PREVIEW_QUALITY {
    DEFAULT,
    MEDIUM,
    HIGH
}

export interface SearchResult {
    items: VideoItem[],
    resultsPerPage: number,
    totalResults: number
}

export interface YouTubeSearchInterface {
    byKeyword(keyword: string): Promise<SearchResult>
    getPreviewUrl(videoId: string, previewQuality: PREVIEW_QUALITY): string
}

export const filterVideoItems = (items: any[]): VideoItem[] => items
    .filter(item => item.id.kind === "youtube#video" &&
        item.snippet.liveBroadcastContent === "none")
    .map(item => {
        const nextItem = pick(item.snippet, [
            "title",
            "videoId",
            "description",
            "publishedAt",
            "channelId",
            "channelTitle"
        ]) as VideoItem

        nextItem.videoId = item.id.videoId

        return nextItem
    })

export default class YouTubeSearchService implements YouTubeSearchInterface {
    private client: YouTubeService
    static YT_PREVIEW_URL = "https://i.ytimg.com/vi"

    static feelingLucky = (searchResult: SearchResult): VideoItem => {
        const { items } = searchResult
        const item = items[0]
        return item
    }

    constructor() {
        const client = new YouTubeService()

        client.setParam({
            part: "snippet",
            type: "video",
            videoDefinition: "high",
            videoEmbeddable: true,
            videoSyndicated: "any",
            safeSearch: "none"
        })

        this.client = client
    }

    public getPreviewUrl(videoId, previewQuality = 1): string {
        const prefix : string = (() => {
            switch (previewQuality) {
            case PREVIEW_QUALITY.MEDIUM: return "mq"
            case PREVIEW_QUALITY.HIGH: return "hq"
            default: return ""
            }
        })()

        return `${YouTubeSearchService.YT_PREVIEW_URL}/${videoId}/${prefix}default.jpg`
    }

    async byKeyword(keyword) {
        this.client
            .setParam("q", keyword)

        try {
            const data = await this.client.request({
                method: "GET",
                url: "/search"
            })

            if (data.kind !== "youtube#searchListResponse") {
                throw new Error("YouTubeSearchService: Bad Response")
            }

            const items : VideoItem[] = filterVideoItems(data.items)

            return {
                resultsPerPage: data.resultsPerPage,
                totalResults: data.totalResults,
                items,
                data
            }
        } catch (err) {
            console.error(err)
        }
    }
}
