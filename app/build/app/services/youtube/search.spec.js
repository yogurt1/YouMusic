"use strict";
const search_1 = require("./search");
test("#getPreviewUrl()", () => {
    test("must build valid preview url", () => {
        const ytss = new search_1.default();
        const mockVideoId = () => "test";
        const testUrl = (videoId) => [
            /ytimg/,
            /default/,
            /\.jpg$/,
            new RegExp(videoId)
        ].every(re => re.test(ytss.getPreviewUrl(videoId)));
        expect(testUrl(mockVideoId())).toBeTruthy();
    });
});
//# sourceMappingURL=search.spec.js.map