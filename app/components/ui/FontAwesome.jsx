import styled, {css, keyframes} from "styled-components"
import {camelCase} from "lodash"
import icons from "./icons.json"

const defaults = {
    size: 14,
    icon: "\f103"
}

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(359deg);
    }
`
const getAnimation = p => {
    switch(true) {
    case p.spin: return `animation: ${spin} 1s infinite linear`
    case p.pulse: return `animation: ${spin} 2s infinite steps(8)`
    default: return ""
    }
}
const getIcon = p => icons[camelCase(p.icon)]
const getSize = p => p.size

const FontAwesome = styled.span`
    display: inline-block;
    font: normal normal ${getSize} FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    ${getAnimation};
    &:before {
        content: "${getIcon}"
    }
`

FontAwesome.defaultProps = {
    icon: defaults.icon,
    size: defaults.size,
    "aria-hidden": true
}
FontAwesome.displayName = "FontAwesome"

export default FontAwesome
