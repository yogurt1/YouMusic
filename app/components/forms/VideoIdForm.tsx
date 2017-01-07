import * as React from "react"
import styled from "styled-components"
import {Field, reduxForm as form} from "redux-form/immutable"
import {Form, FormGroup, Col, Input, Label, Button, FormFeedback} from "reactstrap"

const validate = values => {
    const errors: {
        videoId?: string
    } = {}

    if (!values.get("videoId")) {
        errors.videoId = "Required"
    }

    return errors
}

export interface FormData {
    videoId: string
}

export interface Props {
}

@form<FormData, any, any>({ validate, form: "video" })
export default class VideoIdForm extends React.Component<any, any> {
    renderField({input, label, type, meta}) {
        const {touched, error} = meta
        const color = error ? "danger" : "success"
        return (
            <FormGroup color={color}>
                <Label>{label}</Label>
                {' '}
                <Input
                    {...input}
                    type={type}
                    placeholder="Video ID"
                />
                {touched && error && <FormFeedback>{error}</FormFeedback>}
            </FormGroup>
        )
    }

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props
        return (
            <Form inline onSubmit={handleSubmit}>
                <Field
                    name="videoId"
                    type="text"
                    label="Video ID"
                    component={this.renderField}
                />
                <Button
                    type="submit"
                    disabled={submitting}>
                    Play
                </Button>
            </Form>
        )
    }
}
