const todos = [
    {
        id: 1,
        content: "FIRST"
    },
    {
        id: 2,
        content: "SECOND"
    }
]

const compare = key => val => obj => obj[key] === val
const compareTodoById = compare('id')

export default {
    Query: {
        todos() {
            return todos
        },
        todo(root, args) {
            return todos.find(todo => todo.id === args.id)
        }
    }
}
