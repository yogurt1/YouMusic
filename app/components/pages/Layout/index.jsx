import React from "react"
import {Button} from "semantic-ui-react"
import SidebarLayout from "./sidebar"
import {Column, Row, Container} from "app/components/ui/Grid"
import autobind from "autobind-decorator"

export default class Layout extends React.PureComponent {
    state = {
        isSidebarVisible: false
    }

    @autobind
    toggleSidebar() {
        this.setState({
            isSidebarVisible: !this.state.isSidebarVisible
        })
    }

    render() {
        const {children} = this.props
        const {isSidebarVisible: visible} = this.state
        return (
            <SidebarLayout visible={visible}>
                <Container wide>
                    <Row>
                        <Column>
                            <h1>you music</h1>
                        </Column>
                        <Column right>
                            <Button primary onClick={this.toggleSidebar}>
                                toggle sidebar
                            </Button>
                        </Column>
                    </Row>
                </Container>
                <hr />
                {children}
            </SidebarLayout>
        )
    }
}
