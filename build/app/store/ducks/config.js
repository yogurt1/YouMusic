"use strict";
const immutable_1 = require("immutable");
const redux_actions_1 = require("redux-actions");
const reselect_1 = require("reselect");
const util_1 = require("../util");
exports.types = util_1.createTypes("config", [
    "SET_CONFIG_KEY"
]);
exports.actions = {
    setConfigKey: redux_actions_1.createAction(exports.types.SET_CONFIG_KEY)
};
exports.initialState = immutable_1.Map();
exports.reducer = (state = exports.initialState, action) => {
    switch (action.type) {
        case exports.types.SET_CONFIG_KEY:
            const [k, v] = action.payload;
            return state.set(k, v);
        default: return state;
    }
};
exports.selectors = {
    selectAll: () => state => state.get("config"),
    selectKey: (key) => reselect_1.createSelector(exports.selectors.selectAll(), state => state.get(key))
};
//# sourceMappingURL=config.js.map