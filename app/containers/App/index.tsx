import * as React from 'react'
import * as Helmet from 'react-helmet'
import Layout from '../Layout'
import Loader from '../../components/Loader'
import { LOADER_SELECTOR } from '../../lib/constants'

type State = {
  isLoaded?: boolean
}

export default class App extends React.Component<null, State> {
  state = {
    isLoaded: false
  }

  async componentDidMount() {
    this.setState({ isLoaded: true })
  }

  render() {
    const { isLoaded } = this.state

    if (!isLoaded) {
      return <Loader id={LOADER_SELECTOR} />
    }

    return (
      <Layout>
        <Helmet
          defaultTitle='YouMusic'
          titleTemplate='%s - YouMusic'
        />
        <h1>Hello, world!</h1>
      </Layout>
    )
  }
}
