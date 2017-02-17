"use strict";
const immutable_1 = require("immutable");
const redux_actions_1 = require("redux-actions");
const util_1 = require("../util");
const constants_1 = require("redux-persist/constants");
exports.types = util_1.createTypes("playlist", [
    "ADD",
    "REMOVE",
    "CLEAR",
    "CLEAR_PREVIOUS",
    "CLEAR_NEXT"
]);
exports.actions = {
    addNext: redux_actions_1.createAction(exports.types.ADD),
    remove: redux_actions_1.createAction(exports.types.REMOVE)
};
exports.initialState = immutable_1.OrderedSet();
exports.reducer = (state = exports.initialState, action) => {
    switch (action.type) {
        case exports.types.ADD: return state
            .add(action.payload);
        case exports.types.REMOVE: return state
            .delete(action.payload);
        case exports.types.CLEAR: return state.clear();
        case constants_1.REHYDRATE: return immutable_1.OrderedSet(state);
        default: return state;
    }
};
exports.selectors = {
    selectPrevious() {
    },
    selectNext() {
    },
    selectCurrent() {
    }
};
//# sourceMappingURL=playlist.js.map