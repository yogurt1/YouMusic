"use strict";
const graphql_1 = require("graphql");
const TodoType = new graphql_1.GraphQLObjectType({
    name: "Todo",
    fields: {
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
        author: { type: graphql_1.GraphQLString },
        text: { type: graphql_1.GraphQLString }
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TodoType;
//# sourceMappingURL=type.js.map