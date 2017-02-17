"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const React = require("react");
const react_youtube_1 = require("react-youtube");
const styled_components_1 = require("styled-components");
const video_1 = require("app/store/ducks/video");
const util_1 = require("app/store/util");
exports.mapStateToProps = state => ({
    videoId: state.get("video").get("videoId")
});
let HomePage = class HomePage extends React.Component {
    componentWillMount() {
        const { dispatch, location } = this.props;
        const { videoId } = location.query;
        if (videoId) {
            dispatch(video_1.actions.setVideoId(videoId));
        }
    }
    render() {
        const { videoId, theme } = this.props;
        return (React.createElement("div", {style: { padding: 15 }}, 
            React.createElement(react_youtube_1.default, {videoId: videoId, width: 800, height: 600}), 
            React.createElement("h4", {style: { color: theme.colors.accent }}, 
                "Video ID: ", 
                videoId)));
    }
};
HomePage = __decorate([
    styled_components_1.withTheme,
    util_1.reduxify(exports.mapStateToProps), 
    __metadata('design:paramtypes', [])
], HomePage);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomePage;
//# sourceMappingURL=index.js.map