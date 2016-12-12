import React from "react"
import hoistStatic from "hoist-non-react-statics"

const getComponents = components => typeof(components) === "function"
    ? components()
    : Promise.all(components)

export default function lazyLoad(components) {

    return class WrappedComponent extends React.PureComponent {
        static display
        state = {
            isLoaded: false,
            error: null
        }

        shouldComponentUpdate(nextProps, nextState) {
            return nextState.isLoaded !== this.state.isLoaded
        }

        componentDidMount() {
            getComponents(components)
                .then((...nextComponents) => {
                    this.components = nextComponents
                    this.setState({
                        isLoaded: true
                    })
                })
        }

        render() {
            return !this.state.isLoaded ? (
                <span />
            ) : (
                <Component
                    {...this.props}
                    components={this.components}
                />
            )
        }
    }
}
