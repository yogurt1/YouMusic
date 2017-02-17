import * as React from "react"
import styled, {css} from "styled-components"
import {Link} from "react-router"
import FontAwesome from "app/components/ui/FontAwesome"

const AppSidebar = styled.div`
    height: 100vh;
    width: 240px;
    position: absolute;
    padding-top: 56px;
    transition: transform .3s ease-out;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.45);
    // box-shadow:
    //     3px 0 10px 0 rgba(255,255,255,0)
    //     inset 0 4px 0 rgba(255,255,255,0);
    background-color: #ffe;

    ${p => !p.open && css`
        transform: translate3d(-100%, 0, 0);
    `}
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
        text-decoration: none;
    }
`

export interface Props {
    open: boolean,
    menuItems: Array<{
        name: string,
        path: string,
        icon?: string
    }>
}

export type State = null

export default class Sidebar extends React.PureComponent<Props, State>{
    render() {
        return (
            <AppSidebar open={this.props.open}>
                <AppMenu>
                    {this.props.menuItems.map((item, i) => (
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
            </AppSidebar>
        )
    }
}
