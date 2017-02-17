"use strict";
const redux_1 = require("redux");
const redux_immutable_1 = require("redux-immutable");
const redux_thunk_1 = require("redux-thunk");
const redux_persist_1 = require("redux-persist");
const array_1 = require("./middlewares/array");
const reducers_1 = require("./reducers");
const util_1 = require("./util");
const util_2 = require("../lib/util");
const preloadedState = undefined;
const configureStore = ({ client }) => {
    const middlewares = [
        redux_thunk_1.default,
        array_1.default,
        client.middleware()
    ];
    const apolloReducer = client.reducer();
    reducers_1.default["apollo"] = apolloReducer;
    const reducer = redux_immutable_1.combineReducers(reducers_1.default);
    const finalCreateStore = util_1.composeWithDevTools(redux_1.applyMiddleware(...middlewares), redux_persist_1.autoRehydrate({ log: util_2.isDevEnv }))(redux_1.createStore);
    const store = finalCreateStore(reducer, preloadedState);
    store.injectReducers = nextReducersRegistry => {
        const finalReducersRegistry = Object.assign(reducers_1.default, nextReducersRegistry);
        const nextReducer = redux_immutable_1.combineReducers(finalReducersRegistry);
        store.replaceReducer(reducer);
    };
    const { hot } = module;
    if (hot) {
        hot.accept("./reducers", () => {
            System.import("./reducers")
                .then(m => m.default)
                .then(nextReducersRegistry => store.injectReducers(nextReducersRegistry));
        });
    }
    return store;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = configureStore;
//# sourceMappingURL=index.js.map