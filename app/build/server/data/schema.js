"use strict";
const graphql_1 = require("graphql");
const todo_1 = require("./fields/todo");
const schema = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: "Query",
        fields: {
            todo: todo_1.default
        }
    })
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = schema;
//# sourceMappingURL=schema.js.map