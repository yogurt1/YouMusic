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
const compareTodoById = compare("id")

export default {
    Query: {}
}
