import * as React from "react"
import { AppRegistry, View } from "react-native"
import { ConnectedRouter as Router } from "react-router-redux"
import { ApolloProvider } from "react-apollo"
import { IntlProvider } from "react-intl"
import { ThemeProvider } from "styled-components"
import App from './containers/App/native'
import createMemoryHistory from 'history/createMemoryHistory'
import { configureClient, configureStore } from './store'

const store = configureStore()
const client = configureClient()
const history = createMemoryHistory({})

type State = {
    isLoaded: boolean
}

class YouMusic extends React.Component<null, State> {
    state = {
        isLoaded: false
    }

    async componentWillMount() {
        const authData = await SessionApi.getAuthData()

    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <Loader />
            )
        }

        return (
            <ApolloProvider client={client} store={store}>
                <IntlProvider locale={locale}>
                    <ThemeProvider theme={theme}>
                        <Router history={history}>
                            <App />
                        </Router/>
                    </ThemeProvider>
                </IntlProvider>
            </ApolloProvider>
        )
    }
}

AppRegistry.registerComponent('YouMusic', () => YouMusic)
