import { GraphQLInt as Int } from "graphql"
import TodoType from "./type"
import todoLoader from "./loader"

const todoField = {
    type: TodoType,
    args: {
        id: { type: Int }
    },

    async resolve(todo, args, ctx, { rootValue }) {
        return todoLoader.load(args.id)
    }
}

export default todoField
