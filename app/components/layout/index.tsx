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
    padding: 7px;
`

const Button = styled.button`
    color: #212121;
    background: none;
    border: none;
    outline: none;
    text-rendering: auto;
    text-align: center;
    // font-size: 36px;
    cursor: pointer;
    transition: all .3s ease-in-out;
    transform-origin: center;

    &:hover,
    &:focus {
        border: none;
        outline: none;
        color: inherit;
    }
`

const MenuButton = styled(Button)`
    margin-left: 4px;
    margin-right: 5px;
`

const SearchButton = styled(Button)`
    float: right;
`

const MenuText = styled.p`
    position: relative;
    display: inline-block;
    font-weight: 500;
    font-size: 24px;
    text-align: center;
    // vertical-align: middle;
`

const common = css`
    height: 100vh;
`

const Page = styled.div`
    ${common}
    position: absolute;
    box-sizing: border-box;
    width: 100vw;
    background-color: #eef;
    color: black;
    overflow: hidden;
`

const Content = styled.div`
    ${common}
    padding-top: 56px;
    transition:
        background-color .3s linear,
        transfrom .5s;
    transition-delay: .3s;

    ${p => p.open && css`
        width: calc(100% - 240px);
        overflow: hidden;
        transform: translate3d(240px, 0, 0);
        background-color: rgba(0, 0, 0, .05);
    `}
`

const Sidebar = styled.div`
    ${common}
    position: absolute;
    padding-top: 56px;
    width: 240px;
    transition: transform .5s;
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
    open?: boolean
    search?: boolean
}

export default class Layout extends React.PureComponent<Props, State> {
    state = {
        open: false,
        search: false
    }

    @autobind
    private toggleSidebar() {
        this.setState({
            open: !this.state.open
        })
    }

    @autobind
    private handleSearch() {
        this.setState({
            search: true
        })
    }

    @autobind
    private handleBlur() {
        if (this.state.open) {
            this.toggleSidebar()
        }
    }

    render() {
        const {children, location} = this.props
        const {open, search} = this.state

        return (
            <Page open={open}>
                <TopBar>
                    <MenuButton
                        open={open}
                        onClick={this.toggleSidebar}>
                        <FontAwesome icon="bars" />
                    </MenuButton>
                    <MenuText>MENU</MenuText>
                    <div style={{
                        float: "right",
                        display: search ? "inline-block" : "none"
                    }}>WTF</div>
                    <SearchButton
                        style={{
                            display: search ? "none" : "inline-block"
                        }}
                        onClick={this.handleSearch}>
                        <FontAwesome icon="search" />
                    </SearchButton>
                </TopBar>
                <Sidebar open={open}>
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
                <Content onClick={this.handleBlur} open={open}>
                    {children}
                </Content>
            </Page>
        )
    }
}
