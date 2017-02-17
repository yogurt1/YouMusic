import { map as promiseMap } from "bluebird"
import * as DataLoader from "dataloader"
import * as faker from "faker"
import { times } from "lodash"

const todos = times(5, (i) => ({
    id: i + 1,
    author: faker.name.firstName(),
    text: faker.lorem.sentence()
}))

const getTodo = async id => todos
    .find(todo => todo.id === id)

const todoLoader = new DataLoader(
    ids => promiseMap(ids, getTodo))

export default todoLoader

