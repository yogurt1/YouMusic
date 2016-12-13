import React from "react"
import {Sidebar, Segment, Button, Menu, Image, Icon, Header} from 'semantic-ui-react'

const menuItems = [
    {
        name: "Home",
        icon: "home"
    },
    {
        name: "Search",
        icon: "search"
    }
]

const AppMenu = ({items}) => (
    <div>
        {items.map((item, i) => (
            <Menu.Item key={i} name={item.name.toLowerCase()}>
                <Icon name={item.icon} />
                {item.name}
            </Menu.Item>
        ))}
    </div>
)

export default class SidebarLayout extends React.PureComponent {
    render() {
        const {visible, children} = this.props
        return (
            <div>
                <Sidebar.Pushable>
                    <Sidebar
                        as={Menu}
                        animation='push'
                        width='thin'
                        direction="left"
                        visible={visible}
                        icon='labeled'
                        vertical
                        inverted>
                        <AppMenu items={menuItems} />
                    </Sidebar>
                    <Sidebar.Pusher>
                        {children}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

