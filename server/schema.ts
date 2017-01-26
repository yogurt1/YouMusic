import {
    GraphQLSchema as Schema,
    GraphQLObjectType as ObjectType
} from 'graphql'

import todoField from "./fields/todo"
// import youtube from './queries/youtube'

const schema = new Schema({
    query: new ObjectType({
        name: "Query",
        fields: {
            todo: todoField,
            // youtube: youtubeSchema
        }
    })
})

export default schema
