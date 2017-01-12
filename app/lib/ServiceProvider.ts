import * as React from "react"
import { createEagerFactory, withContext, wrapDisplayName } from "recompose"
import hoistStatics from "hoist-non-react-statics"
const hoist = from => to => hoistStatics(to, from)

export interface Services {
    [key: string]: Object
}

export interface Props {
    services: Services
}

export const servicesShape = React.PropTypes.object

export default class ServiceProvider extends React.Component<Props, null> {
    private services: Services

    static propTypes = {
        services: servicesShape.isRequired
    }

    static childContextTypes = {
        services: servicesShape.isRequired
    }

    static displayName = "ServicesProvider"

    constructor(props, context) {
        super(props, context)
        this.services = props.services
    }

    getChildContext() {
        const { services } = this

        return services
    }

    render() {
        const { children } = this.props
        return React.Children.only(children)
    }
}

export function withService<P>(...services: string[]): ClassDecorator {
    return WrappedComponent => {
        const factory = createEagerFactory(WrappedComponent)

        @hoistStatics(WrappedComponent)
        class WithServices extends React.Component<P & Props, null> {
            static displayName = wrapDisplayName(WrappedComponent, "withService")
            static contextTypes = {
                services: React.PropTypes.object
            }

            shouldComponentUpdate() {
                return true
            }

            render() {
                return factory(this.props) as React.ReactElement<any>
            }
        }

        return WithServices
    }
}

