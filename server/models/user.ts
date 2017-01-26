import * as Joi from "joi"
import * as Model from "bookshelf-modelbase"

export default class User extends Model {
    get tableName: string = () => "users"

    validate = {}
}
