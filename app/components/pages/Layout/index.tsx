import * as React from "react"
import styled, {css, keyframes} from "styled-components"
import {Button, Divider} from "semantic-ui-react"
import {Clearfix, Section} from "app/components/ui/Grid"
import FontAwesome from "app/components/ui/FontAwesome"
import SidebarLayout from "./sidebar"
import {autobind} from "core-decorators"
import {connect} from "react-redux"

const TopBar = styled(Clearfix)`
    position: fixed;
    height: 56px;
    width: 100%;
    left: 0;
    top: 0;
    border-top: 0;
    z-index: 100;
    font-size: 24px;
    background-color: white;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
`

const PageSection = styled.div`
    background-color: #eef;
    color: black;
`

const MenuButton = styled.button`
    position: absolute;
    cursor: pointer;
    color: #212121;
    background: none;
    border: none;
    outline: none;
    text-rendering: auto;
    text-align: center;
    font-size: 36px;
    left: 4px;

    cursor: pointer;
    color: black;
    transition: all .3s ease-in-out;
    transform-origin: center;

    &:hover,
    &:focus {
        color: inherit;
    }
`

const Bars = styled.span`
    &:before {
        content: "=";
    }
`

export interface Props {
    location: string
}

export interface State {
    isSidebarVisible?: boolean
}

export default class Layout extends React.PureComponent<Props, State> {
    state = {
        isSidebarVisible: false
    }

    @autobind
    toggleSidebar() {
        this.setState({
            isSidebarVisible: !this.state.isSidebarVisible
        })
    }

    @autobind
    handleBlur() {
        if (this.state.isSidebarVisible) {
            this.toggleSidebar()
        }
    }

    render() {
        const {children, location} = this.props
        const {isSidebarVisible} = this.state

        return (
            <PageSection>
                <TopBar>
                    <MenuButton
                        open={isSidebarVisible}
                        onClick={this.toggleSidebar}>
                        <FontAwesome icon="bars" />
                    </MenuButton>
                </TopBar>
                <SidebarLayout visible={isSidebarVisible}>
                    <div onClick={this.handleBlur}>
                        {children}
                    </div>
                </SidebarLayout>
            </PageSection>
        )
    }
}
