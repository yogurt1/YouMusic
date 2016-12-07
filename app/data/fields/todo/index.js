import {
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType
} from "graphql"
import todoLoader from "./loader"

export const TodoType = new GraphQLObjectType({
    name: "Todo",
    fields: () => ({
        id: {type: GraphQLString},
        text: {type: GraphQLString}
    })
})

export default {
    type: TodoType,
    args: {
        id: {type: GraphQLInt}
    },
    resolve(root, args, ctx) {
        return todoLoader.load(args.id)
    }
}
