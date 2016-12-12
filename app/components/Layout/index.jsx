import React from "react"
import SidebarLayout from "./sidebar"
import {Column, OffsetBy, Row, Container} from "app/components/ui/Grid"
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
                        <Column right>
                            <h1>you music</h1>
                        </Column>
                        <Column>
                            <button onClick={this.toggleSidebar}>
                                <h3>toggle sidebar</h3>
                            </button>
                        </Column>
                    </Row>
                </Container>
                <hr />
                {children}
            </SidebarLayout>
        )
    }
}
