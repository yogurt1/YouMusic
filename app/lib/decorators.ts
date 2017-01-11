import * as React from "react"
import styled from "styled-components"
import hoistStatics from "hoist-non-react-statics"
import { isBrowser, noopNull, thunk } from "./util"
import { getDisplayName } from "recompose"

export const browserOnly = fallback => isBrowser ? thunk :
    () => ( fallback || noopNull )

export const lazyLoad = createPromises => WrappedComponent => hoistStatics(
    class LazyLoad extends React.Component<any, any> {
        static WrappedComponent = WrappedComponent
        static displayName = `LazyLoad(${getDisplayName(WrappedComponent)})`

        state = {
            loaded: null
        }

        shouldComponentUpdate(_, nextState) {
            return true
        }

        componentDidMount() {
            createPromises().then(loaded =>
                    this.setState({loaded}))
        }

        render() {
            const {loaded} = this.state
            const {children, ...props} = this.props
            return !loaded ? null : React.createElement(WrappedComponent, {
                ...props,
                loaded,
            }, children)
        }
    }, WrappedComponent)

export const LazyLoad = ({children, promises}) => lazyLoad(promises)(children)

export const styledDecorator = (styles, from = "div") => {
    const Styled = styled(from)`${styles}`
    return component => props => React.createElement(Styled, null,
        React.createElement(component, props))
}
