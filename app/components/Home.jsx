import React from 'react'
import styled from 'styled-components'
import {Container, Grid} from 'react-styled-skeleton'

const Msg = styled('span')`
    font-size: 60px;
    color: #111;
`

const ColorMsg = styled(Msg)`
    color: ${p => p.color || "#111"};
`

const BlockMsg = styled(ColorMsg)`
    display: block;
    box-shadow: 1px 1px 1px #eef;
`

const msgs = [
    "Hi!",
    "HMR",
    "Lorem"
]
export default function Home() {
    return (
        <div>
            <Container>
                <Grid count={1/3}>
                    {msgs.map((msg, i) => (
                        <BlockMsg key={i}>{msg}</BlockMsg>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}
