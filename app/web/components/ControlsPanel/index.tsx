import * as React from "react"
import styled from "styled-components"

const Panel = styled.div`
    position: absolute;
    background: white;
    color: black;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
    bottom: 0;
    left: 0;
    right: 0;
    height: 70px;
    width: 100%;

    & span { font-size: 36px; }
`

export interface Props {}
export interface State {}

export default class ControlsPanel extends React.Component<null, null> {
    render() {
        return (
            <Panel>
                <span>PLACEHOLDER</span>
                <h1>WTF</h1>
            </Panel>
        )
    }
}
