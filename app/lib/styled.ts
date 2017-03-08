import * as styledComponents from "styled-components"
import { ThemedStyledComponents } from "styled-components"

const {
    default: styled,
    css,
    injectGlobal,
    keyframes,
    ThemeProvider
} = styledComponents as ThemedStyledComponents<any>

export default styled
export { css, injectGlobal, keyframes, ThemeProvider }
