import * as React from "react"
import styled from "styled-components"
import hoistStatics from "hoist-non-react-statics"
import { isBrowser, noopNull, thunk } from "./util"
import { getDisplayName } from "recompose"

export const browserOnly = fallback => isBrowser ? thunk :
    () => ( fallback || noopNull )

export const lazyLoad = (...importees: Promise<any>[]) =>
    WrappedComponent => hoistStatics(
        class LazyLoad extends React.Component<any, { modules: any[] }> {
            static WrappedComponent = WrappedComponent
            static displayName = `LazyLoad(${getDisplayName(WrappedComponent)})`

            state = { modules: null }

            shouldComponentUpdate(_, nextState) {
                return true
            }

            componentDidMount() {
                Promise.all(importees)
                    .then(modules =>
                          this.setState({ modules }))
            }

            render() {
                const { modules } = this.state
                const { children, ...props } = this.props

                if (!modules) {
                    return null
                }

                return React.createElement(WrappedComponent, {
                    modules,
                    ...props
                }, children)
            }
        }, WrappedComponent)

export const LazyLoad: React.StatelessComponent<{
    modules: Promise<any>[]
}> = ({ children, modules }) => lazyLoad(...modules)(children)

export const styledDecorator = (styles, from = "div") => {
    const Styled = styled(from)`${styles}`
    return component => props => React.createElement(Styled, null,
        React.createElement(component, props))
}
