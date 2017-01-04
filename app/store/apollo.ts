import ApolloClient from "apollo-client"

export default function configureApolloClient(networkInterface) {
    const opts = {
        networkInterface,
        ssrMode: !(<any>process).browser,
        dataIdFromObject(res) {
            if (res.id && res.__typename) {
                return res.__typename + res.id
            }
            return null
        },
        reduxRootSelector(state) {
            return state.get("apollo")
        }
    }

    const client = new ApolloClient(opts)
    return client
}
