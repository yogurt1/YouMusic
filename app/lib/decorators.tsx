import * as React from "react"
import styled from "styled-components"
import hoistStatics from "hoist-non-react-statics"
import { shouldUpdate, wrapDisplayName } from "recompose"
import { F } from 'ramda'
import { isBrowser, noopNull, thunk } from "./util"

export const browserOnly = fallback => isBrowser ? thunk
    : () => (fallback || noopNull)

export const lazyLoad = (...importees: Promise<any>[]) =>
    WrappedComponent => hoistStatics(
        class LazyLoad extends React.Component<any, { modules: any[] }> {
            static WrappedComponent = WrappedComponent
            static displayName = wrapDisplayName(WrappedComponent, 'LazyLoad')

            state = { modules: null }

            shouldComponentUpdate(_, nextState) {
                return true
            }

            componentWillMount() {
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

export const renderThen = <T, P>(promise: Promise<T>) =>
    WrappedComponent => hoistStatics(class extends React.Component<P, {
        resolved?: T
    }> {
        static WrappedComponent = WrappedComponent
        static displayName = wrapDisplayName(WrappedComponent, 'ThenCatch')

        state = { resolved: null }

        componentDidMount() {
            promise.then(resolved =>
                this.setState({ resolved }))
        }

        render() {
            const { resolved } = this.state
            return !resolved ? null : (
                <WrappedComponent
                    resolved={resolved}
                    {...this.props}
                />
            )
        }
    }, WrappedComponent)

export const shouldntUpdate = shouldUpdate(F)

// export const styledDecorator = (styles, from = "div") => {
//     const Styled = styled(from)`${styles}` as React.Component<any, any>
//     return (Component: React.Component<any, any>) => (props: any) => (
//         <Styled {...props}>
//            <Component {...props} />
//         </Styled>
//     )
// }
