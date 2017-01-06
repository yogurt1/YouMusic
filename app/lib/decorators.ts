import styled from "styled-components"
import {createElement, Component} from "react"
import hoistStatics from "hoist-non-react-statics"
import * as util from "./util"

export const browserOnly = fallback => !util.isBrowser
    ? (_ => fallback || (_ => null))
    : (component => component)

// export const lazyLoad = createPromises => WrappedComponent => {
//     class LazyLoad extends Component {
//         static WrappedComponent = WrappedComponent
//         static displayName = `LazyLoad(${getDisplayName(WrappedComponent)})`
//         state = {
//             loaded: null
//         }

//         shouldComponentUpdate(_, nextState) {
//             return nextState.loaded !== null
//         }

//         componentDidMount() {
//             createPromises().then(loaded =>
//                     this.setState({loaded}))
//         }

//         render() {
//             const {loaded} = this.state
//             return loaded || createElement(WrappedComponent, {
//                 ...this.props,
//                 loaded
//             })
//         }
//     }

//     return hoistStatics(LazyLoad, WrappedComponent)
// }

export const styledDecorator = (styles, from = "div") => {
    const Styled = styled(from)`${styles}`
    return component => props => createElement(Styled, null,
        createElement(component, props))
}
