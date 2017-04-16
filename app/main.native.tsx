import * as React from 'react'
import * as ReactNative from 'react-native'
import { ConnectedRouter as Router } from 'react-router-redux'
import { ApolloProvider } from 'react-apollo'
import { IntlProvider } from 'react-intl'
import { ThemeProvider } from 'styled-components'
import { createNetworkInterface } from 'apollo-client'
import createMemoryHistory from 'history/createMemoryHistory'
import configureStore from './store'
import configureApolloClient from './store/apollo'
import App from './containers/App/native'
import theme from './theme'
import * as constants from './lib/constants'
import * as nativeUtils from './lib/nativeUtils'
import persistStoreAsync from './lib/persistStoreAsync'

const locale = nativeUtils.getLocale()
const history = createMemoryHistory()
const client = configureApolloClient(
  createNetworkInterface({
    uri: constants.GRAPHQL_ENDPOINT
  })
)
const store = configureStore({ client, history, locale })

type State = {
  isLoaded?: boolean
}

class YouMusic extends React.Component<null, State> {
  state = {
    isLoaded: false
  }

  async componentDidMount() {
    const persistor = await persistStoreAsync({
      store,
      storage: ReactNative.AsyncStorage,
      key: constants.STORAGE_STATE_KEY,
      blacklist: ['routing']
    })

    this.setState({ isLoaded: true })
  }

  render() {
    const { isLoaded } = this.state
    if (!isLoaded) {
      return <h1>Loading...</h1>
    }

    return (
      <ApolloProvider client={client} store={store}>
        <IntlProvider locale={locale}>
          <ThemeProvider theme={theme}>
            <Router history={history}>
              <App />
            </Router>
          </ThemeProvider>
        </IntlProvider>
      </ApolloProvider>
    )
  }
}

ReactNative.AppRegistry.registerComponent('YouMusic', () => YouMusic)
