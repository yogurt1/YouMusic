import React from 'react'
import styled from 'styled-components'
import {Field, reduxForm as form} from 'redux-form/immutable'

const ErrorBlock = styled.span`
    border: 1px solid red;
`

const validate = values => {
    const errors = {}

    if (!values.get('videoId')) {
        errors.videoId = "Required"
    }

    return errors
}

@form({validate, form: 'video'})
export default class VideoIdForm extends React.PureComponent {
    renderField({input, label, type, meta}) {
        const {touched, error} = meta
        return (
            <div>
                <label>{label}</label>
                <div>
                    <input
                        {...input}
                        type={type}
                        placeholder={label}
                    />
                    {touched && error && (
                        <ErrorBlock>{error}</ErrorBlock>
                    )}
                </div>
            </div>
        )
    }

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props
        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name="videoId"
                    type="text"
                    label="Video ID"
                    component={this.renderField}
                />
                <div>
                    <button
                        type="submit"
                        disabled={submitting}>
                        Submit
                    </button>
                    <button
                        type="button"
                        disabled={pristine || submitting}
                        onClick={reset}>
                        Reset
                    </button>
                </div>
            </form>
        )
    }
}
