"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const React = require("react");
const recompose_1 = require("recompose");
const hoist_non_react_statics_1 = require("hoist-non-react-statics");
const hoist = from => to => hoist_non_react_statics_1.default(to, from);
exports.servicesShape = React.PropTypes.object;
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
ServiceProvider.propTypes = {
    services: exports.servicesShape.isRequired
};
ServiceProvider.childContextTypes = {
    services: exports.servicesShape.isRequired
};
ServiceProvider.displayName = "ServicesProvider";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ServiceProvider;
function withService(...services) {
    return WrappedComponent => {
        const factory = recompose_1.createEagerFactory(WrappedComponent);
        let WithServices = class WithServices extends React.Component {
            shouldComponentUpdate() {
                return true;
            }
            render() {
                return factory(this.props);
            }
        };
        WithServices.displayName = recompose_1.wrapDisplayName(WrappedComponent, "withService");
        WithServices.contextTypes = {
            services: React.PropTypes.object
        };
        WithServices = __decorate([
            hoist_non_react_statics_1.default(WrappedComponent), 
            __metadata('design:paramtypes', [])
        ], WithServices);
        return WithServices;
    };
}
exports.withService = withService;
//# sourceMappingURL=ServiceProvider.js.map