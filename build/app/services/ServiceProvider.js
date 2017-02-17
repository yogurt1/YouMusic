"use strict";
const React = require("react");
const R = require("ramda");
const recompose_1 = require("recompose");
const servicesShape = React.PropTypes.object;
class ServiceProvider extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.services = props.services;
    }
    getChildContext() {
        const { services } = this;
        return services;
    }
    render() {
        const { children } = this.props;
        return React.Children.only(children);
    }
}
ServiceProvider.childContextTypes = {
    services: servicesShape.isRequired
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ServiceProvider;
exports.injectService = (...serviceNames) => recompose_1.compose(recompose_1.withProps(({ services }) => R.pick(serviceNames, services)), recompose_1.getContext({ services: servicesShape.isRequired }));
//# sourceMappingURL=ServiceProvider.js.map