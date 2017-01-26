import * as Joi from "joi"
import { Model } from "../bookshelf"

export default class User extends Model {
    get tableName(): string {
        return "users"
    }
}
