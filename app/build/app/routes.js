"use strict";
const React = require("react");
const react_router_1 = require("react-router");
const layout_1 = require("./components/layout");
const HomePage_1 = require("./components/pages/HomePage");
const NoMatchPage_1 = require("./components/pages/NoMatchPage");
const TestPage_1 = require("./components/pages/TestPage");
const util_1 = require("app/lib/util");
if (typeof (System) === "undefined") {
    const System = {
        import(path) {
            try {
                return Promise.resolve(require(path));
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
    };
}
const getPage = importee => (nextState, done) => importee
    .then(m => done(null, m.default || m))
    .catch(err => {
    if (util_1.isDevEnv) {
        console.log("[RR] got error: ", err.message);
    }
    done(err, null);
});
const VideoPage = ({ params }) => (React.createElement("div", null, 
    React.createElement("h1", null, params.id)
));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_router_1.createRoutes(React.createElement(react_router_1.Route, null, 
    React.createElement(react_router_1.Route, {path: "/test", component: TestPage_1.default}), 
    React.createElement(react_router_1.Route, {path: "/", component: layout_1.default}, 
        React.createElement(react_router_1.IndexRoute, {component: HomePage_1.default}), 
        React.createElement(react_router_1.Route, {path: "/video/:id", component: VideoPage})), 
    React.createElement(react_router_1.Route, {path: "*", component: NoMatchPage_1.default})));
//# sourceMappingURL=routes.js.map