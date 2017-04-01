import * as React from 'react'
import * as R from 'ramda'

export const getDefault = (importee: Promise<any>): Promise<any> =>
    importee
        .then(R.prop('default'))

type Props = {
    [key: string]: any,
    promise: Promise<any>,
    render(props: Object): React.ReactElement<Object>
}

type State = {
    isResolved: boolean,
    resolved:  | null,
}

export default class Async extends React.Component<Props, State> {
    state = {
        isResolved: true,
        resolved: null
    }

    componentWillMount() {
        const { promise } = this.props
        promise
            .then(resolved => {
                this.setState({
                    resolved,
                    isResolved: true,
                })
            })
    }

    render() {
        const { render, ...props } = this.props
        const { isResolved, resolved } = this.state
        return isResolved
            ? render({ resolved, ...props })
            : null
    }
}
