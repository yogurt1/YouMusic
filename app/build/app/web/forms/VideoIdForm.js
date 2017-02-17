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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const React = require("react");
const immutable_1 = require("redux-form/immutable");
const reactstrap_1 = require("reactstrap");
const validate = values => {
    const errors = {};
    if (!values.get("videoId")) {
        errors.videoId = "Required";
    }
    return errors;
};
let VideoIdForm = class VideoIdForm extends React.Component {
    renderField({ input, label, type, meta }) {
        const { touched, error } = meta;
        const color = error ? "danger" : "success";
        return (React.createElement(reactstrap_1.FormGroup, {color: color}, 
            React.createElement(reactstrap_1.Input, __assign({}, input, {type: type, placeholder: "Video ID"}))
        ));
    }
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (React.createElement(reactstrap_1.Form, {inline: true, onSubmit: handleSubmit}, 
            React.createElement(immutable_1.Field, {name: "videoId", type: "text", label: "Video ID", component: this.renderField}), 
            ' ', 
            React.createElement(reactstrap_1.Button, {disabled: submitting}, "Play")));
    }
};
VideoIdForm = __decorate([
    immutable_1.reduxForm({ validate, form: "video" }), 
    __metadata('design:paramtypes', [])
], VideoIdForm);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VideoIdForm;
//# sourceMappingURL=VideoIdForm.js.map