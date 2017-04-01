import * as React from "react"
import { AppRegistry, View } from "react-native"
import { ConnectedRouter as Router } from "react-router-redux"
import { ApolloProvider } from "react-apollo"
import { IntlProvider } from "react-intl"
import { ThemeProvider } from "styled-components"

const history = createMemoryHistory({})

type State = {
    isLoaded: boolean
}

class A extends React.Component<null, State> {
    state = {
        isLoaded: false
    }

    async componentWillMount() {
        const authData = await AsyncStorage.getItem("auth_data")

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
