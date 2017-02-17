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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const React = require("react");
const react_router_1 = require("react-router");
const core_decorators_1 = require("core-decorators");
const VideoSearchForm_1 = require("app/components/forms/VideoSearchForm");
const search_1 = require("app/services/youtube/search");
const video_1 = require("app/store/ducks/video");
const util_1 = require("app/store/util");
exports.mapStateToProps = state => ({
    videoId: state.get("video").get("videoId")
});
let TopBarSearchForm = class TopBarSearchForm extends React.Component {
    handleSubmit(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const { router, dispatch } = this.props;
            const keyword = values.get("keyword");
            const searchResult = yield this.youTubeSearchService
                .byKeyword(keyword);
            const [{ videoId }] = searchResult.items;
            router.push({
                pathname: "/",
                query: { videoId }
            });
            dispatch(video_1.actions.setVideoId(videoId));
        });
    }
    componentDidMount() {
        this.youTubeSearchService = new search_1.default();
    }
    render() {
        const { videoId } = this.props;
        return (React.createElement(VideoSearchForm_1.default, {onSubmit: this.handleSubmit}));
    }
};
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', Promise)
], TopBarSearchForm.prototype, "handleSubmit", null);
TopBarSearchForm = __decorate([
    react_router_1.withRouter,
    util_1.reduxify(exports.mapStateToProps), 
    __metadata('design:paramtypes', [])
], TopBarSearchForm);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TopBarSearchForm;
//# sourceMappingURL=search.js.map