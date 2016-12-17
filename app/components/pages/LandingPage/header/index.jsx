import React from "react"
import styled, {css} from "styled-components"
import {Link} from "react-router"
import Media from "react-media"
import {Button} from "semantic-ui-react"
import {Clearfix, Flex, Section} from "app/components/ui/Grid"
import GhostButton from "app/components/ui/GhostButton"
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

const HeaderSection = styled(Section)`
    background-color: #2b1f35;
    color: #fff;
`

const HeroSection = styled(Section)`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const heroText = css`
    text-align: center;
    margin: 0;
`

const HeroText = styled.p`
    ${heroText}
    font-size: 42pt;
    font-weight: 500;
`

const HeroSubText = styled.p`
    ${heroText}
    font-size: 20pt;
    font-weight: 300;
`

const HeroButton = styled(GhostButton)`
    position: absolute;
    left: 50%;
    bottom: 15%;
    transform: translate(-50%, 20%);
`

export default class Header extends React.Component {
    handleJoinClick() {
        if (process.browser) {
            alert("Try!")
        }
    }

    render() {
        return (
            <HeaderSection height={500}>
                <TopBar>
                    <Logo>MIRACL</Logo>
                    <MenuWithItems links={links} />
                </TopBar>
                <HeroSection height={300}>
                    <HeroText>
                        YOU MUSIC
                    </HeroText>
                    <HeroSubText>
                        JUST FOR YOU
                    </HeroSubText>
                    <HeroButton onClick={this.handleJoinClick}>
                        Join
                    </HeroButton>
                </HeroSection>
            </HeaderSection>
        )
    }
}
