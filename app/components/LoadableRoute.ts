import * as React from 'react'
import { Route } from 'react-router'

export default class LoadableRoute extend React.Component<any, any> {
    render() {
        const { onLoad, ...props } = this.props
        return <Route {...props} />
    }
}
