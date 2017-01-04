import React from "react"
import styled from "styled-components"
import {Field, reduxForm as form} from "redux-form/immutable"
import {Form, Input, Label, Button} from "semantic-ui-react"

const ErrorBlock = styled.span`
    border: 1px solid red;
`

const validate = values => {
    const errors = {}

    if (!values.get("videoId")) {
        errors.videoId = "Required"
    }

    return errors
}

@form({validate, form: "video"})
export default class VideoIdForm extends React.PureComponent {
    renderField({input, label, type, meta}) {
        const {touched, error} = meta
        return (
            <Form.Field>
                <Input
                    {...input}
                    type={type}
                    error={!!error}
                    placeholder="Video ID"
                />
                {touched && error && <ErrorBlock>{error}</ErrorBlock>}
            </Form.Field>
        )
    }

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props
        return (
            <Form onSubmit={handleSubmit}>
                <Field
                    name="videoId"
                    type="text"
                    label="Video ID"
                    component={this.renderField}
                />
                <Button
                    type="submit"
                    primary
                    disabled={submitting}>
                    Play
                </Button>
            </Form>
        )
    }
}
