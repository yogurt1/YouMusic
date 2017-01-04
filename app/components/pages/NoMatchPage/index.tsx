import * as React from "react"
import styled from "styled-components"
import {Button, Header} from "semantic-ui-react"
import {InjectedRouter, withRouter} from "react-router"

const ErrorPage = styled.div`
    position: absolute;

`

const ErrorBlock = styled.span`
    background: red;
    font-weight: 600;
    font-size: 40px;
`

const ErrorMessage = styled.span`
    font-size: 40px;

`

const GoBackButton = styled.button`
    outline: none;

`

export interface Props {
    router: InjectedRouter,
    errorMessage: string
}

@withRouter
export default class NoMatchPage extends React.PureComponent<Props, null> {
    handleClick = () => this.props.router.goBack()

    render() {
        const {errorMessage = "Not found"} = this.props
        return (
            <ErrorPage>
                <ErrorBlock>
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                    <GoBackButton onClick={this.handleClick}>
                        Go back
                    </GoBackButton>
                </ErrorBlock>
            </ErrorPage>
        )
    }
}
