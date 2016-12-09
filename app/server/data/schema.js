export default `
type Query {
    todos: [Todo],
    todo(id: Int = 1): Todo
}

schema {
    query: Query
}
`

