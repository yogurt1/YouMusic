import {createElement, Component} from "react"
import hoistStatics from "hoist-non-react-statics"

const getIsBrowser () => typeof(window) === "object"
const getDisplayName = c => c.displayName || c.name || "Component"
const defaultFallback = () => null

export const browserOnly = fallback => component =>
    getIsBrowser() ? component : (fallback || defaultFallback)

export const lazyLoad = createPromises => WrappedComponent => {
    class LazyLoad extends Component {
        static WrappedComponent = WrappedComponent
        static displayName = `LazyLoad(${getDisplayName(WrappedComponent)})`
        state = {
            loaded: null
        }

        shouldComponentUpdate(_, nextState) {
            return nextState.loaded !== null
        }

        componentDidMount() {
            createPromises().then(loaded =>
                    this.setState({loaded}))
        }

        render() {
            const {loaded} = this.state
            return loaded || createElement(WrappedComponent, {
                ...this.props,
                loaded
            })
        }
    }

    return hoistStatics(LazyLoad, WrappedComponent)
}

export const styledDecorator = (styles, from = "div") => {
    const Styled = styled(from)`${styles}`
    return component => props => createElement(Styled, null,
        createElement(component, props))
}
