import * as React from "react"
import styled from "styled-components"
import * as R from "ramda"
import {
    hoistStatics,
    shouldUpdate,
    wrapDisplayName,
    createEagerFactory,
    renderNothing,
    InferableComponentEnhancer
} from "recompose"


export const shouldntUpdate = shouldUpdate(R.F)
export const renderIf = (condition: boolean): InferableComponentEnhancer =>
    WrappedComponent => condition ? WrappedComponent : renderNothing

export const lazyLoad = (...importees: Promise<any>[]): InferableComponentEnhancer =>
    WrappedComponent => {
        const factory = createEagerFactory(WrappedComponent)

        @hoistStatics(WrappedComponent)
        class LazyLoad extends React.Component<any, any> {
            static diplsayName = wrapDisplayName(WrappedComponent, "LazyLoad")
            state = { modules: null }

            componentDidMount() {
                Promise.all(importees)
                    .then(modules => this.setState({ modules }))
            }

            render () {
                const { modules } = this.state
                return R.isNil(modules) ? null : factory({
                    modules,
                    ...this.props
                })
            }
        }

        return LazyLoad
    }

// export const styledDecorator = (styles, from = "div") => {
//     const Styled = styled(from)`${styles}` as React.Component<any, any>
//     return (Component: React.Component<any, any>) => (props: any) => (
//         <Styled {...props}>
//            <Component {...props} />
//         </Styled>
//     )
// }
