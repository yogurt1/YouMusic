import * as React from "react"
import styled from "styled-components"
import {Field, reduxForm as form} from "redux-form/immutable"
import {Form, FormGroup, Col, Input, Label, Button, FormFeedback} from "reactstrap"
import {injectIntl} from "react-intl"

const validate = values => {
    const errors: {
        keyword?: string
    } = {}

    if (!values.get("keyword")) {
        errors.keyword = "Required"
    }

    return errors
}

export interface FormData {
    keyword: string
}

export interface Props {
}

@injectIntl
@form<FormData, any, any>({ validate, form: "video" })
export default class VideoSearchForm extends React.Component<any, any> {
    renderField({input, label, type, meta}) {
        const { touched, error } = meta
        const color = error ? "danger" : "success"
        return (
            <FormGroup color={color}>
                {/*touched && error && (
                    <FormFeedback style={{ fontSize: 10}}>
                        {error}
                    </FormFeedback>
                )*/}
                <Input
                    {...input}
                    type={type}
                    style={{
                        width: 300
                    }}
                />
            </FormGroup>
        )
    }

    render() {
        const {
            intl,
            handleSubmit,
            pristine,
            reset,
            submitting,
            width
        } = this.props
        return (
            <Form inline onSubmit={handleSubmit}>
                <Field
                    name="keyword"
                    type="text"
                    placeholder={intl.messages["VideoFormSearch.placeholder"]}
                    component={this.renderField}
                />
                {' '}
                <Button disabled={submitting}>
                    Feeling lucky
                </Button>
            </Form>
        )
    }
}
