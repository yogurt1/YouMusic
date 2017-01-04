import * as React from "react"
import styled, {css, keyframes} from "styled-components"
import {Link} from "react-router"
import FontAwesome from "app/components/ui/FontAwesome"
import {autobind} from "core-decorators"
import {connect} from "react-redux"

const TopBar = styled.div`
    position: fixed;
    height: 56px;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    font-size: 24px;
    background-color: white;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
    transition: all .3s ease-in-out;
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

const common = css`
    height: 100vh;
`

const Page = styled.div`
    ${common}
    position: absolute;
    box-sizing: border-box;
    padding-top: 56px;
    margin-top: -56px;
    width: 100vw;
    background-color: #eef;
    color: black;
`

const Content = styled.div`
    ${common}
    padding-top: 56px;
    transition: all .3s ease;

    ${p => p.open && css`
        width: calc(100% - 240px);
        overflow: hidden;
        transform: translate3d(240px, 0, 0);
    `}
`

const Sidebar = styled.div`
    ${common}
    position: absolute;
    padding-top: 56px;
    width: 240px;
    transition: transform .3s ease;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.45);
    background-color: #ffe;

    ${p => !p.open && css`
        transform: translate3d(-100%, 0, 0);
    `}
`

const AppSidebar = styled.div`
    padding-top: 56px;
    background: white;
    color: black;
    box-shadow:
        3px 0 10px 0 rgba(255,255,255,0)
        inset 0 4px 0 rgba(255,255,255,0);
`
const AppMenu = styled.div`
    padding: 15px;
    display: flex;
    flex-direction: column;
    jusitfy-content: space-around;
`

const AppMenuItem = styled.div`
    text-align: center;
    padding: 4px;
`

const AppMenuLink = styled(Link)`
    display: block;
    color: black;

    &:hover,
    &:focus,
    &.active {
        color: white;
        border-radius: 14px;
        background: rgba(7, 4, 239, 1);
        font-weight: 500;
    }
`

const menuItems = [
    {
        name: "Home",
        icon: "home",
        path: "/"
    },
    {
        name: "Search",
        icon: "search",
        path: "/search"
    }
]



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
            <Page>
                <TopBar>
                    <MenuButton
                        open={isSidebarVisible}
                        onClick={this.toggleSidebar}>
                        <FontAwesome icon="bars" />
                    </MenuButton>
                </TopBar>
                <Sidebar open={isSidebarVisible}>
                    <AppMenu>
                        {menuItems.map((item, i) => (
                            <AppMenuItem key={i}>
                                <AppMenuLink
                                    activeClassName="active"
                                    to={item.path}>
                                    <FontAwesome icon={item.icon} />
                                    {item.name}
                                </AppMenuLink>
                            </AppMenuItem>
                        ))}
                    </AppMenu>
                </Sidebar>
                <Content open={isSidebarVisible}>
                    {children}
                </Content>
            </Page>
        )
    }
}
