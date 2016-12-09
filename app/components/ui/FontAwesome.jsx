import styled, {css, keyframes} from 'styled-components'
import {camelCase} from 'lodash'
import icons from "./icons.json"

const defaults = {
    size: 14,
    lineHeight: 1,
    borderColor: "#eee",
    inverse: "#fff",
    liWidth: "calc(30em) / 14)",
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
        default: return ''
    }
}
const getIcon = p => icons[camelCase(p.children || p.icon)]
const getSize = p => p.size

const FontAwesome = styled.span`
    font-family: FontAwesome;
    font: normal normal normal ${getSize} FontAwesome;
    text-rendering: auto;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    ${getAnimation}

    &:before {
        content: ${getIcon}
    }
`
FontAwesome.defaultProps = {
    icon: defaults.icon,
    size: defaults.size
}

export default FontAwesome
export const toInject = `
    @font-face {
        font-family: "FontAwesome";
        src:
    }
`
