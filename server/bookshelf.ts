import * as Knex from "knex"
import * as Bookshelf from "bookshelf"
import * as ModelBase from "bookshelf-modelbase"
import * as config from "../config"

export const knex = Knex(config.db.knex)
export const bookshelf = Bookshelf(knex)
export { ModelBase as Model }

bookshelf
    .plugin("register")
    .plugin(ModelBase.pluggable)
