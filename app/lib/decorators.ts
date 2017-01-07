import styled from "styled-components"
import * as React from "react"
import hoistStatics from "hoist-non-react-statics"
import * as util from "./util"

export const browserOnly = fallback => !util.isBrowser
    ? (_ => fallback || (_ => null))
    : (component => component)

export const lazyLoad = createPromises => WrappedComponent => hoistStatics(
    class LazyLoad extends React.Component<any, any> {
        static WrappedComponent = WrappedComponent
        static displayName = `LazyLoad(${util.getDisplayName(WrappedComponent)})`

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
