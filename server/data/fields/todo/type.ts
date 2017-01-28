import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLNonNull as NonNull
} from 'graphql'

const TodoType = new ObjectType({
    name: "Todo",
    fields: {
        id: { type: new NonNull(ID) },
        text: { type: StringType }
    }
})

export default TodoType
