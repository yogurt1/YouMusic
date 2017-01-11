import YouTubeSearchService from "./search"

test("#getPreviewUrl()", () => {
    test("must build valid preview url", () => {
        const ytss = new YouTubeSearchService()
        const mockVideoId = () => "test"

        const testUrl = (videoId: string): boolean => [
            /ytimg/,
            /default/,
            /\.jpg$/,
            new RegExp(videoId)
        ].every(re => re.test(ytss.getPreviewUrl(videoId)))

        expect(testUrl(mockVideoId())).toBeTruthy()
    })
})
