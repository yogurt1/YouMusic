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
const styled_components_1 = require("styled-components");
const core_decorators_1 = require("core-decorators");
const FontAwesome_1 = require("../ui/FontAwesome");
const ClickOutside_1 = require("../ui/ClickOutside");
const sidebar_1 = require("./sidebar");
const search_1 = require("./search");
const TopBar = styled_components_1.default.div `
    position: fixed;
    height: 56px;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    font-size: 24px;
    background-color: white;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
    transition: all .3s ease-in-out;
    padding: 7px;
`;
const Button = styled_components_1.default.button `
    color: #212121;
    background: none;
    border: none;
    outline: none;
    text-rendering: auto;
    text-align: center;
    // font-size: 36px;
    cursor: pointer;
    transition: all .3s ease-in-out;
    transform-origin: center;

    &:hover,
    &:focus {
        border: none;
        outline: none;
        color: inherit;
    }
`;
const MenuButton = styled_components_1.default(Button) `
    margin-left: 4px;
    margin-right: 5px;
`;
const SearchButton = styled_components_1.default(Button) `
    ${p => !p.show && styled_components_1.css `
        display: none;
    `}
    float: right;
`;
const SearchFormWrapper = styled_components_1.default.div `
    float: right;
    ${p => p.show && styled_components_1.css `
        display: inline-block;
    `}
`;
const MenuText = styled_components_1.default.span `
    position: relative;
    font-weight: 500;
    font-size: 24px;
    text-align: center;

    @media (max-width: 900px) {
        display: none;
    }
`;
const common = styled_components_1.css `
    height: 100vh;
`;
const Page = styled_components_1.default.div `
    ${common}
    position: absolute;
    box-sizing: border-box;
    width: 100vw;
    background-color: #eef;
    color: black;
    overflow: hidden;
`;
const Content = styled_components_1.default.div `
    ${common}
    padding-top: 56px;
    transition: background-color .3s;

    ${p => p.open && styled_components_1.css `
        background-color: rgba(0, 0, 0, .15);
    `}
`;
const menuItems = [
    {
        name: "Home",
        icon: "home",
        path: "/"
    },
    {
        name: "Search",
        icon: "search",
        path: "/search"
    }
];
class Layout extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            open: false,
            search: false
        };
    }
    toggleSidebar() {
        this.setState((prevState, props) => ({
            open: !prevState.open
        }));
    }
    handleMenuButonClick(ev) {
        if (this.menuButtonRef.contains(ev.target) &&
            this.menuButtonRef !== ev.target) {
            ev.stopPropagation();
            this.toggleSidebar();
        }
    }
    handleSearch() {
        this.setState({ search: true });
    }
    handleClickOutside(ev) {
        if (!this.menuButtonRef.contains(ev.target)) {
            this.setState(prevState => prevState.open &&
                ({ open: false }));
        }
    }
    render() {
        const { children, location } = this.props;
        const { open, search } = this.state;
        return (React.createElement(Page, { open: open },
            React.createElement(TopBar, null,
                React.createElement("span", { onClick: this.handleMenuButonClick, ref: ref => this.menuButtonRef = ref },
                    React.createElement(MenuButton, { open: open },
                        React.createElement(FontAwesome_1.default, { icon: "bars" })),
                    React.createElement(MenuText, null, "MENU")),
                React.createElement(SearchFormWrapper, { show: search },
                    React.createElement(search_1.default, null)),
                React.createElement(SearchButton, { show: search, onClick: this.handleSearch },
                    React.createElement(FontAwesome_1.default, { icon: "search" }))),
            React.createElement(ClickOutside_1.default, { onClickOutside: this.handleClickOutside },
                React.createElement(sidebar_1.default, { open: open, menuItems: menuItems })),
            React.createElement(Content, null, children)));
    }
}
__decorate([
    core_decorators_1.autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Layout.prototype, "toggleSidebar", null);
__decorate([
    core_decorators_1.autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Layout.prototype, "handleMenuButonClick", null);
__decorate([
    core_decorators_1.autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Layout.prototype, "handleSearch", null);
__decorate([
    core_decorators_1.autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Layout.prototype, "handleClickOutside", null);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Layout;
//# sourceMappingURL=index.js.map