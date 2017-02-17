"use strict";
const createFlags = (names) => names.reduce((ac, k, i) => {
    ac[k] = 0x1 * (i + 1);
    return ac;
}, {});
exports.flags = createFlags([
    'MOBILE',
    'WEB',
    'ELECTRON',
    'BROWSER'
]);
exports.createTest = (mask) => (flags) => mask & flags;
//# sourceMappingURL=platform.js.map