import React from "react"
import styled, {css} from "styled-components"
import {Link} from "react-router"
import Media from "react-media"
import {Row, Clearfix, Flex} from "app/components/ui/Grid"
import Section from "../section"
import MenuWithItems from "./menu"

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
    display: inline-block;
    float: left;
    width: 100px;
    position: relative;
    margin-left: 30px;

    &:before {
        position: absolute;
        float: left;
        display: inline-block;
        content: "";
        background-size: cover;
        background-image: url(/assets/react.svg);
        width: 30px;
        height: 30px;
        margin-left: -40px;
        margin-top: -5px;
    }
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
                    <Media query={{minWidth: "764px"}}>
                        {m => (
                            <MenuWithItems links={links} />
                        )}
                    </Media>
                </TopBar>
            </Section>
        )
    }
}
