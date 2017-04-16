import * as React from 'react'
import { Route } from 'react-router'
import { connect, MapStateToProps } from 'react-redux'

const Loader = () => <h1>Loading...</h1>

type State = {
  isLoaded?: boolean
}

// @connect(mapStateToProps)
export default class App extends React.Component<null, State> {
  state = {
    isLoaded: false
  }

  async componentDidMount() {
    // const { dispatch } = this.props
    // const authData = await SessionApi.getAuthData()
    // dispatch(authenticateUser())
  }

  render() {
    const { isLoaded } = this.state

    if (!isLoaded) {
      return (
        <Loader />
      )
    }

    return (
      <h1>Hello, world</h1>
    )
  }
}