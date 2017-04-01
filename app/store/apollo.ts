import * as R from 'ramda'
import { lensProp as lensPropImmutable } from 'ramda-immutable'
import ApolloClient, { NetworkInterface } from 'apollo-client'
import platform from 'app/lib/platform'
import { APOLLO_STATE_KEY } from 'app/lib/constants'

const stateSelector = (R.view as any)(
    lensPropImmutable(APOLLO_STATE_KEY)
)

export default (networkInterface: NetworkInterface): ApolloClient => {
    const opts = {
        networkInterface,
        connectToDevTools: platform.isDev,
        reduxRootKey: APOLLO_STATE_KEY,
        reduxRootSelector: stateSelector,
        ssrMode: !(
            platform.isElectron ||
            platform.isBrowser
        ),
        dataIdFromObject (res) {
            if (res.id && res.__typename) {
                return res.__typename + res.id
            }

            return null
        }
    }

    const client = new ApolloClient(opts)
    return client
}
