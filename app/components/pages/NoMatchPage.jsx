import React from "react"
import styled from "styled-components"

const ErrorBlock = styled.span`
    background: red;
    font-weight: 600;
    font-size: 40px;
`

export default class NoMatchPage extends React.PureComponent {
    render() {
        const {error} = this.props
        return (
            <div>
                <h1>No match (From RR and NoMatchPage)</h1>
                <ErrorBlock>{error}</ErrorBlock>
            </div>
        )
    }
}
