"use strict";
const apollo_client_1 = require("apollo-client");
function configureApolloClient(networkInterface) {
    const opts = {
        networkInterface,
        ssrMode: !process.browser,
        dataIdFromObject(res) {
            if (res.id && res.__typename) {
                return res.__typename + res.id;
            }
            return null;
        },
        reduxRootSelector(state) {
            return state.get("apollo");
        }
    };
    const client = new apollo_client_1.default(opts);
    return client;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = configureApolloClient;
//# sourceMappingURL=apollo.js.map