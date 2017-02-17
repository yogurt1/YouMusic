import * as Knex from "knex"
import * as Bookshelf from "bookshelf"
import * as config from "../config"

const ModelBase = require("bookshelf-modelbase")

export const knex = Knex(config.db.knex)
export const bookshelf = Bookshelf(knex)
export const Model = ModelBase(bookshelf) as any

bookshelf
    .plugin("registry")

export default bookshelf
