import { List } from "immutable"
import * as faker from "faker"
import Todo from "../records/todo"

const createTodo = () => new Todo({
    author: faker.name.firstName(),
    text: faker.random.words()
})

