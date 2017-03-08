import * as React from "react"
import styled from "styled-components"
import {InjectedRouter, withRouter} from "react-router"
import {Button} from "reactstrap"

const ErrorPage = styled.div`
    height: 100vh;
    widht: 100vw;
    background-color: #eef;
    color: black;
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
                <Button onClick={this.handleClick}>Go back</Button>
            </ErrorPage>
        )
    }
}
