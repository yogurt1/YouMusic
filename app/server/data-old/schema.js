import {
    GraphQLSchema,
    GraphQLObjectType
} from "graphql"
import fields from "./fields"

const QueryType = new GraphQLObjectType({
    fields,
    name: "Query"
})

const schema = new GraphQLSchema({
    query: QueryType
})

export default schema
