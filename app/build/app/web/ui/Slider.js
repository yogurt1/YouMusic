"use strict";
const styled_components_1 = require("styled-components");
const Slider = styled_components_1.default.div `
    width: ${p => p.width};
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: mandatory;
    scroll-snap-points-y: repeat(100%);
    font-size: 0;
`;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Slider;
//# sourceMappingURL=Slider.js.map