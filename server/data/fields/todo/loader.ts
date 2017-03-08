import { map as promiseMap } from "bluebird"
import * as DataLoader from "dataloader"
import * as faker from "faker"
import { times } from "lodash"
import * as R from "ramda"

type Todo = { id: number, author: string, text: string }
const todos: Todo[] = times(5, (i): Todo => ({
    id: i + 1,
    author: faker.name.firstName(),
    text: faker.lorem.sentence()
}))


const findTodoById = async id => R.find(R.propEq("id", id), todos)
const getTodo = id => Promise.resolve(findTodoById(id))

const todoLoader = new DataLoader(
    ids => Promise.all(
        R.map(findTodoById)(ids)
    )
)

export default todoLoader

