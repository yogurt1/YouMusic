"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const _1 = require("./");
const lodash_1 = require("lodash");
var PREVIEW_QUALITY;
(function (PREVIEW_QUALITY) {
    PREVIEW_QUALITY[PREVIEW_QUALITY["DEFAULT"] = 0] = "DEFAULT";
    PREVIEW_QUALITY[PREVIEW_QUALITY["MEDIUM"] = 1] = "MEDIUM";
    PREVIEW_QUALITY[PREVIEW_QUALITY["HIGH"] = 2] = "HIGH";
})(PREVIEW_QUALITY = exports.PREVIEW_QUALITY || (exports.PREVIEW_QUALITY = {}));
exports.filterVideoItems = (items) => items
    .filter(item => item.id.kind === "youtube#video" &&
    item.snippet.liveBroadcastContent === "none")
    .map(item => {
    const nextItem = lodash_1.pick(item.snippet, [
        "title",
        "videoId",
        "description",
        "publishedAt",
        "channelId",
        "channelTitle"
    ]);
    nextItem.videoId = item.id.videoId;
    return nextItem;
});
class YouTubeSearchService {
    constructor() {
        const client = new _1.default();
        client.setParam({
            part: "snippet",
            type: "video",
            videoDefinition: "high",
            videoEmbeddable: true,
            videoSyndicated: "any",
            safeSearch: "none"
        });
        this.client = client;
    }
    getPreviewUrl(videoId, previewQuality = 1) {
        const prefix = (() => {
            switch (previewQuality) {
                case PREVIEW_QUALITY.MEDIUM: return "mq";
                case PREVIEW_QUALITY.HIGH: return "hq";
                default: return "";
            }
        })();
        return `${YouTubeSearchService.YT_PREVIEW_URL}/${videoId}/${prefix}default.jpg`;
    }
    byKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            this.client
                .setParam("q", keyword);
            try {
                const data = yield this.client.request({
                    method: "GET",
                    url: "/search"
                });
                if (data.kind !== "youtube#searchListResponse") {
                    throw new Error("YouTubeSearchService: Bad Response");
                }
                const items = exports.filterVideoItems(data.items);
                return {
                    resultsPerPage: data.resultsPerPage,
                    totalResults: data.totalResults,
                    items,
                    data
                };
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
YouTubeSearchService.YT_PREVIEW_URL = "https://i.ytimg.com/vi";
YouTubeSearchService.feelingLucky = (searchResult) => {
    const { items } = searchResult;
    const item = items[0];
    return item;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = YouTubeSearchService;
//# sourceMappingURL=search.js.map