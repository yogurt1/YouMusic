import * as Joi from "joi"
import { Model } from "../bookshelf"

export default class Todo
 extends Model {
    get tableName() {
        return "todos"
    }

    validate = {
        text: Joi.string()
    }

    public user() {
        return this.hasOne("User")
    }
}
