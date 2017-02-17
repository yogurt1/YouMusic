"use strict";
const immutable_1 = require("immutable");
const redux_actions_1 = require("redux-actions");
const util_1 = require("../util");
exports.types = util_1.createTypes("video", [
    "SET_VIDEOID"
]);
exports.actions = {
    setVideoId: redux_actions_1.createAction(exports.types.SET_VIDEOID)
};
const fake = {
    videoId: () => "qMwcsIY1GYE"
};
exports.initialState = immutable_1.Map({
    videoId: fake.videoId()
});
exports.reducer = (state = exports.initialState, action) => {
    switch (action.type) {
        case exports.types.SET_VIDEOID: return state
            .set("videoId", action.payload);
        default: return state;
    }
};
//# sourceMappingURL=video.js.map