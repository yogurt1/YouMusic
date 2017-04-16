import './vendor'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { AppContainer } from 'react-hot-loader'
import { ApolloProvider } from 'react-apollo'
import { IntlProvider } from 'react-intl'
import { ThemeProvider } from 'styled-components'
import * as localForage from 'localforage'
import { createNetworkInterface } from 'apollo-client'
import createHistory from 'history/createBrowserHistory'
import configureStore from './store'
import configureApolloClient from './store/apollo'
import persistStoreAsync from './lib/persistStoreAsync'
import * as constants from './lib/constants'
import * as browserUtils from './lib/browserUtils'
import theme from './theme'
import App from './containers/App'

const locale = browserUtils.getLocale()
const storage = localForage.createInstance({
  description: 'redux state',
  name: 'reduxState'
})
const history = createHistory()
const client = configureApolloClient(
  createNetworkInterface({
    uri: constants.GRAPHQL_ENDPOINT
  })
)
const store = configureStore({
  client,
  history,
  locale
})

const renderApp = (AppComponent) => {
  ReactDOM.render(
    <AppContainer>
      <ApolloProvider client={client} store={store}>
        <IntlProvider locale={locale}>
          <ThemeProvider theme={theme}>
            <Router history={history}>
              <AppComponent />
            </Router>
          </ThemeProvider>
        </IntlProvider>
      </ApolloProvider>
    </AppContainer>,
    document.getElementById(constants.TARGET_SELECTOR)
  )
}

window.onload = async () => {
  const persistor = await persistStoreAsync({
    store,
    storage,
    key: constants.STORAGE_STATE_KEY,
    blacklist: [constants.APOLLO_STATE_KEY]
  })

  const preloadedState = browserUtils.getPreloadedState()
  if (preloadedState) {
    persistor.rehydrate(preloadedState)
  }

  renderApp(App)

  const criticalCss = document.getElementById(constants.CRITICAL_CSS_SELECTOR)
  criticalCss.addEventListener('load', () => {
    criticalCss.remove()
  })
}

const { hot } = module as any
if (hot) {
  hot.accept('./containers/App', () => {
    renderApp(App)
  })
}
