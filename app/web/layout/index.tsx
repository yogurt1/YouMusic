import * as React from "react"
import styled, { css, keyframes } from "styled-components"
import { Link } from "react-router-web"
import { autobind } from "core-decorators"
import FontAwesome from "../ui/FontAwesome"
import ClickOutside from "../ui/ClickOutside"
import Sidebar from "./sidebar"
import TopBarSearchForm from "./search"

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
    ${p => !p.show && css`
        display: none;
    `}
    float: right;
`

const SearchFormWrapper = styled.div`
    float: right;
    ${p => p.show && css`
        display: inline-block;
    `}
`

const MenuText = styled.span`
    position: relative;
    font-weight: 500;
    font-size: 24px;
    text-align: center;

    @media (max-width: 900px) {
        display: none;
    }
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
    transition: background-color .3s;

    ${p => p.open && css`
        background-color: rgba(0, 0, 0, .15);
    `}
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
    private menuButtonRef: HTMLElement

    state = {
        open: false,
        search: false
    }

    @autobind
    private toggleSidebar() {
        this.setState((prevState, props) => ({
            open: !prevState.open
        }))
    }

    @autobind
    private handleMenuButonClick(ev) {
        if (this.menuButtonRef.contains(ev.target) &&
           this.menuButtonRef !== ev.target) {
            ev.stopPropagation()
            this.toggleSidebar()
        }
    }

    @autobind
    private handleSearch() {
        this.setState({ search: true })
    }

    @autobind
    private handleClickOutside(ev) {
        if (!this.menuButtonRef.contains(ev.target)) {
            this.setState(prevState => prevState.open &&
                          ({ open: false }))
        }
    }

    render() {
        const {children, location} = this.props
        const {open, search} = this.state

        return (
            <Page open={open}>
                <TopBar>
                    <span
                        onClick={this.handleMenuButonClick}
                        ref={ref => this.menuButtonRef = ref}>
                        <MenuButton
                            open={open}>
                            <FontAwesome icon="bars" />
                        </MenuButton>
                        <MenuText>MENU</MenuText>
                    </span>
                    <SearchFormWrapper show={search}>
                        <TopBarSearchForm />
                    </SearchFormWrapper>
                    <SearchButton
                        show={search}
                        onClick={this.handleSearch}>
                        <FontAwesome icon="search" />
                    </SearchButton>
                </TopBar>
                <ClickOutside onClickOutside={this.handleClickOutside}>
                    <Sidebar open={open} menuItems={menuItems} />
                </ClickOutside>
                <Content>
                    {children}
                </Content>
            </Page>
        )
    }
}
