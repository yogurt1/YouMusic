"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require("react");
const styled_components_1 = require("styled-components");
const react_router_1 = require("react-router");
const reactstrap_1 = require("reactstrap");
const ErrorPage = styled_components_1.default.div `
    height: 100vh;
    widht: 100vw;
    background-color: #eef;
    color: black;
`;
let NoMatchPage = class NoMatchPage extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.handleClick = () => this.props.router.goBack();
    }
    render() {
        const { errorMessage = "Not found" } = this.props;
        return (React.createElement(ErrorPage, null,
            React.createElement(reactstrap_1.Button, { onClick: this.handleClick }, "Go back")));
    }
};
NoMatchPage = __decorate([
    react_router_1.withRouter
], NoMatchPage);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NoMatchPage;
//# sourceMappingURL=index.js.map