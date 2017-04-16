import * as React from 'react'
import styled, { css } from 'styled-components'

export const ghostButton = css`
    display: inline-block;
    width: 200px;
    padding: 8px;
    color: #fff;
    border: 2px solid #fff;
    text-align: center;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    transition: all .2s ease-out;

    &:hover,
    &:active {
        background-color: #fff;
        color: #000;
        transition: all .3s ease-in;
    }
`

const GhostButton = styled.span`${ghostButton}`

export const wrapGhostButton = (
  component: React.Component<any, any>
) => styled(component)`${ghostButton}`

export default GhostButton

