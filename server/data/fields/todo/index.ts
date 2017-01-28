import { GraphQLInt as Int } from "graphql"
import TodoType from './type'

const todoField = {
    type: TodoType,
    args: {
        id: { type: Int }
    },

    async resolve(todo, args, ctx, { rootValue }) {
        return loader.load(args.id)
    }
}

export default todoField
