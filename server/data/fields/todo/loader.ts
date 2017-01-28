import DataLoader from "dataloader"
import { times } from "lodash"
import faker from "faker"

const todos = times(5, (i) => ({
    id: i + 1,
    text: faker.lorem.sentence()
}))

const getTodo = async id => todos
    .find(todo => todo.id === id)

const todoLoader = new DataLoader(ids => ids.map(getTodo))

export default todoLoader


