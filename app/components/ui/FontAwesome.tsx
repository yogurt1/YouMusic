import * as React from "react"
import styled, {css, keyframes} from "styled-components"
import {camelCase} from "lodash"
const icons = require("./icons.json")

const defaults = {
    size: 14,
    icon: "\f103"
}

// export const spin = keyframes`
//     0% {
//         transform: rotate(0deg);
//     }
//     100% {
//         transform: rotate(359deg);
//     }
// `
// const getAnimation = p => {
//     switch(true) {
//         case p.spin: return `animation: ${spin} 1s infinite linear`
//         case p.pulse: return `animation: ${spin} 2s infinite steps(8)`
//         default: return ""
//     }
// }

// const BaseFontAwesome = styled.span`
//     display: inline-block;
//     font: normal normal ${p => p.size} FontAwesome;
//     font-size: inherit;
//     text-rendering: auto;
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
//  `

// const FontAwesome = styled.span`
//     ${getAnimation};

//     &:before { content: "${p => icons[camelCase(p.icon)]}"; }
// `

// FontAwesome.defaultProps = {
//     icon: defaults.icon,
//     size: defaults.size,
//     "aria-hidden": true
// }
// FontAwesome.displayName = "FontAwesome"

export const SimpleFontAwesome: React.StatelessComponent<{
    icon: string,
    className?: string
}> = ({icon, className, ...props}) => (
    <span {...props} className={`fa fa-${icon} ${className}`} />
)

const FontAwesome = SimpleFontAwesome

export default SimpleFontAwesome
