import React from "react"
import styled from "styled-components"
import {Button, Header} from "semantic-ui-react"
import {withRouter} from "react-router"

const ErrorBlock = styled.span`
    background: red;
    font-weight: 600;
    font-size: 40px;
`

@withRouter
export default class NoMatchPage extends React.PureComponent {
    onClick = () => this.props.router.goBack()

    render() {
        return (
            <div>
                <Header>Not found :(</Header>
                <Button onClick={this.onClick}>Go back</Button>
            </div>
        )
    }
}
