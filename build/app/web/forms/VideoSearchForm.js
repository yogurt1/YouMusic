"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require("react");
const immutable_1 = require("redux-form/immutable");
const reactstrap_1 = require("reactstrap");
const react_intl_1 = require("react-intl");
const validate = values => {
    const errors = {};
    if (!values.get("keyword")) {
        errors.keyword = "Required";
    }
    return errors;
};
let VideoSearchForm = class VideoSearchForm extends React.Component {
    renderField({ input, label, type, meta }) {
        const { touched, error } = meta;
        const color = error ? "danger" : "success";
        return (React.createElement(reactstrap_1.FormGroup, { color: color },
            React.createElement(reactstrap_1.Input, __assign({}, input, { type: type, style: {
                    width: 300
                } }))));
    }
    render() {
        const { intl, handleSubmit, pristine, reset, submitting, width } = this.props;
        return (React.createElement(reactstrap_1.Form, { inline: true, onSubmit: handleSubmit },
            React.createElement(immutable_1.Field, { name: "keyword", type: "text", placeholder: intl.messages["VideoFormSearch.placeholder"], component: this.renderField }),
            ' ',
            React.createElement(reactstrap_1.Button, { disabled: submitting }, "Feeling lucky")));
    }
};
VideoSearchForm = __decorate([
    react_intl_1.injectIntl,
    immutable_1.reduxForm({ validate, form: "video" })
], VideoSearchForm);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VideoSearchForm;
//# sourceMappingURL=VideoSearchForm.js.map