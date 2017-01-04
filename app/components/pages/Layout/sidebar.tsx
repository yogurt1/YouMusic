import * as React from "react"
import styled from "styled-components"
import {Link} from "react-router"
import {Sidebar, Segment, Button, Icon} from "semantic-ui-react"

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

export interface Props {
    visible: boolean
}
export interface State {}

export default class SidebarLayout extends React.PureComponent<Props, State> {
    render() {
        const {visible, children} = this.props
        return (
            <div>
                <Sidebar.Pushable>
                    <Sidebar
                        as={AppSidebar}
                        animation="push"
                        width="thin"
                        direction="left"
                        visible={visible}
                        icon="labeled"
                        vertical
                        inverted>
                        <AppMenu>
                            {menuItems.map((item, key) => (
                                <AppMenuItem key={key}>
                                    <AppMenuLink
                                        activeClassName="active"
                                        to={item.path}>
                                    <Icon name={item.icon} />
                                        {item.name}
                                    </AppMenuLink>
                                </AppMenuItem>
                            ))}
                        </AppMenu>
                    </Sidebar>
                    <Sidebar.Pusher>
                        {children}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

