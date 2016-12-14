import React from "react"
import styled, {css} from "styled-components"
import {Link} from "react-router"
import {Row, Clearfix, Flex} from "app/components/ui/Grid"
import Section from "./section"

const topBarText = css`
    font-size: 11pt;
    font-weight: 500;
    color: white;
`

const TopBar = styled(Clearfix)`
    padding: 20px;
`

const Logo = styled.span`
    ${topBarText}
    display: block;
    float: left;
    width: 30px;

    &:before {
        content: "";
        display: block;
        position: absolute;
        margin-left: 0 auto;
        background-size: cover;
        background-image: url(/assets/react.svg);
        backgrond-position: -10px;
        width: 10px;
        height: 10px;
    }
`

const Menu = styled(Flex)`
    float: right;
    justify-content: baseline;
`

const MenuLink = styled(Link)`
    padding: 5px;
    display: block;
    ${topBarText}
`

const links = [
    {
        to: "/",
        name: "Home"
    },
    {
        to: "/promo",
        name: "Promo"
    },
    {
        to: "/about",
        name: "About"
    }
]

export default class HeaderSection extends React.Component {
    render() {
        return (
            <Section>
                <TopBar>
                    <Logo>MIRACL</Logo>
                    <Menu>
                        {links.map((link, key) => (
                            <MenuLink key={key} to={link.to}>{link.name}</MenuLink>
                        ))}
                    </Menu>
                </TopBar>
            </Section>
        )
    }
}
