import * as React from "react"
import * as R from "ramda"
import { compose, withProps, hoistStatics, getContext } from "recompose"

type Services = {
    [key: string]: Object
}

const servicesShape = React.PropTypes.object

export default class ServiceProvider extends React.Component<{ services: Services }, null> {
    private services: Services

    static childContextTypes = {
        services: servicesShape.isRequired
    }

    constructor(props, context) {
        super(props, context)
        this.services = props.services
    }

    getChildContext () {
        const { services } = this

        return services
    }

    render () {
        const { children } = this.props
        return React.Children.only(children)
    }
}

export const injectService = (...serviceNames: string[]) => compose(
    withProps(({ services }) => R.pick(serviceNames, services)),
    getContext({ services: servicesShape.isRequired })
)
