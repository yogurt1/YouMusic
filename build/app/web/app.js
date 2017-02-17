"use strict";
const React = require("react");
const react_router_web_1 = require("react-router-web");
const layout_1 = require("./components/layout");
const HomeScene_1 = require("./scenes/HomeScene");
const NoMatchScene_1 = require("./scenes/NoMatchScene");
if (typeof System === "undefined") {
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
const VideoScene = ({ params }) => (React.createElement("div", null,
    React.createElement("h1", null, params.id)));
class Root extends React.Component {
    render() {
        return (React.createElement(layout_1.default, null,
            React.createElement(react_router_web_1.Route, { exact: true, path: "/", component: HomeScene_1.default }),
            React.createElement(react_router_web_1.Route, { path: "/video/:id", component: VideoScene }),
            React.createElement(react_router_web_1.Route, { component: NoMatchScene_1.default })));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Root;
//# sourceMappingURL=app.js.map