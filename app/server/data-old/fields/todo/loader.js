import DataLoader from "dataloader"
const pickIds = todos => todos.map(t => t.id)

const todos = [
    {
        id: 1,
        text: "Lorem ipum it sem dollar"
    },
    {
        id: 2,
        text: "<h1>Hello, world!</h1>"
    }
]

const getTodo = async id => todos.filter(todo => todo.id === id)[0]
const getBatchTodos = async ids => ids.map(getTodo)
const todoLoader = new DataLoader(getBatchTodos)
todoLoader.loadAll = () => todoLoader.loadMany(pickIds(todos))

export default todoLoader
