import * as React from "react"
import styled from "styled-components"
import {Field, reduxForm as form} from "redux-form/immutable"
import {DataShape, FormProps} from "redux-form"
import {Form, FormGroup, Input, Button} from "reactstrap"

const ErrorBlock = styled.span`
    border: 1px solid red;
`

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

@form({validate, form: "video"})
export default class VideoIdForm extends React.PureComponent<FormProps<FormData, Props, null>, null> {
    renderField({input, label, type, meta}) {
        const {touched, error} = meta
        return (
            <FormGroup>
                <Input
                    {...input}
                    type={type}
                    error={!!error}
                    placeholder="Video ID"
                />
                {touched && error && <ErrorBlock>{error}</ErrorBlock>}
            </FormGroup>
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
