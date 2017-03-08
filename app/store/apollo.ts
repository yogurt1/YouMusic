import * as R from "ramda"
import ApolloClient from "apollo-client"
import platform from "../lib/platform"
import { APOLLO_STATE_KEY } from "../lib/constants"

export default function configureApolloClient(networkInterface) {
    const opts = {
        networkInterface,
        reduxRootSelector: state => state.get(APOLLO_STATE_KEY),
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
