import TodoType from './type'

const todoField = {
    type: TodoType,
    resolve(todo, args, ctx, { rootValue }) {
        return true && {
            text: "random"
        }
    }
}

export default todoField
