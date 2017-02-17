import * as React from "react"
import * as ReactNative from "react-native"
import { NativeRouter } from "react-router-native"
import { ApolloProvider } from "react-apollo"
import { IntlProvider } from "react-intl"
import { ThemeProvider } from "styled-components/native"
import { createNetworkInterface } from "apollo-client"
import { persistStore } from "redux-persist-immutable"
import configureStore from "./store"
import configureApolloClient from "./store/apollo"
import AuthService from "./services/AuthService"

const theme = require("./theme.json")
const getLocale = () => {
    const { RNI18N } = ReactNative.NativeModules
    switch (ReactNative.Platform.OS) {
        case 'android': return RNI18n.getCurrentLocale(l => l)
        case 'ios': return RNI18N.locale
        default: return "en"
    }
}

const formatLocale = l => l.replace(/_/, '-')
const locale = formatLocale(getLocale())

const networkInterface = createNetworkInterface({ uri: "/graphql" })
const client = configureApolloClient(networkInterface)
const store = configureStore({ client })
// TODO: "./store".records <=> Record[]
const persistor = persistStore(store, {
        storage: ReactNative.AsyncStorage,
    key: "state",
    blacklist: ["routing"],
    records: []
})


const App = () => (
    <ApolloProvider
        client={client}
        store={store}
        <IntlProvider locale={locale}>
            <ThemeProvider theme={theme}>
                <MemoryRouter>
                    <Root />
                </MemoryRouter>
            </ThemeProvider>
        </IntlProvider>
    </ApolloProvider>
)

ReactNative.AppRegistry.registerComponent('App', () => App)
