import {makeExecutableSchema} from 'graphql-tools'
import {merge} from 'lodash'
import Schema from './schema'
import Resolvers from './resolvers'
import {
    schema as TodoSchema,
    resolvers as TodoResolvers
} from './todo'

const schemas = [
    TodoSchema
]

const resolvers = [
    TodoResolvers
]

export default makeExecutableSchema({
    typeDefs: [Schema, ...schemas],
    resolvers: merge(Resolvers, ...resolvers)
})