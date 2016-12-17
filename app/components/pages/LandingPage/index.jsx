import React from "react"
import styled from "styled-components"
import {Section} from "app/components/ui/Grid"
import Header from "./header"

const Fill = styled.div`
    background: lightblue;
    height: 100%;
`

export default class LandingPage extends React.Component {
    render() {
        return (
            <Section>
                <Header />
                <Section height="100%">
                    <Fill />
                </Section>
            </Section>
        )
    }
}
