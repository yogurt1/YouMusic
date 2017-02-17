"use strict";
const styled_components_1 = require("styled-components");
const VideoContainer = styled_components_1.default.div `
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px;
    height: 0;
    overflow: hidden;
    margin-top: 10px;

    & > span > iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;
VideoContainer.displayName = "VideoContainer";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VideoContainer;
//# sourceMappingURL=VideoContainer.js.map