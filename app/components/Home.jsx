import React from 'react'
import styled from 'styled-components'
import {Container, Grid} from './Grid'

const Msg = styled('span')`
    font-size: 45px;
    color: #111;
`

const BlockMsg = styled(Msg)`
    color: #111;
    display: block;
    box-shadow: 1px 1px 1px #eef;
`

const msgs = [
    "Hello, World!",
    "HMR Test",
    "Lorem"
].map((msg, i) => (
    <BlockMsg key={i}>{msg}</BlockMsg>
))
export default function Home() {
    return (
        <div>
            <Container>
                <Grid>
                    {msgs}
                </Grid>
            </Container>
        </div>
    )
}
