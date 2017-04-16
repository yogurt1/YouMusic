import * as React from "react"
import { Location } from 'history'
import styled, { css, keyframes } from 'styled-components'
import { Link } from "react-router-dom"
import FontAwesome from "app/components/ui/FontAwesome"
import ClickOutside from "app/components/ui/ClickOutside"
import Sidebar from "./sidebar"
import TopBarSearchForm from "./search"
import menuItems from './menuItems'

const Button = styled.button``
const MenuButton = styled(Button)``

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

const SearchButton = styled(MenuButton)`
    ${(p: any) => !p.show && css`
        display: none;
    `}
    float: right;
`

const SearchFormWrapper = styled.div`
    float: right;
    ${p => (p as any).show && css`
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

type State = {
    open?: boolean,
    search?: boolean
}

export default class Layout extends React.Component<null, State> {
   state = {
        open: false,
        search: false
    }


  private menuButtonRef: HTMLElement
    private setMenuButtonRef = (ref: HTMLElement) => {
        this.menuButtonRef = ref
    }


    private toggleSidebar = () => {
        this.setState((prevState, props) => ({
            open: !prevState.open
        }))
    }

    private handleMenuButonClick = (ev) => {
        if (this.menuButtonRef.contains(ev.target) &&
           this.menuButtonRef !== ev.target) {
            ev.stopPropagation()
            this.toggleSidebar()
        }
    }

    private handleSearch = () => {
        this.setState({ search: true })
    }

    private handleClickOutside = (ev) => {
        if (!this.menuButtonRef.contains(ev.target as any)) {
            this.setState(prevState => (
                prevState.open &&
                { open: false }
            ))
        }
    }

    render() {
        const { open, search } = this.state

        return (
            <Page open={open}>
                <TopBar>
                    <span
                        onClick={this.handleMenuButonClick}
                        ref={this.setMenuButtonRef}>
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
                    {this.props.children}
                </Content>
            </Page>
        )
    }
}
