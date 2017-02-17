"use strict";
const React = require("react");
const react_native_1 = require("react-native");
const react_router_1 = require("react-router");
const react_native_2 = require("react-native");
class App extends React.Component {
    render() {
        return (React.createElement(react_router_1.NativeRouter, null, 
            React.createElement(react_native_1.View, null, 
                React.createElement(react_native_2.Route, {path: "/", exact: true})
            )
        ));
    }
}
react_native_1.AppRegistry.register("YouMusic", () => App);
//# sourceMappingURL=index.android.js.map