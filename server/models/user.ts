import * as crypto from "crypto"
import { Model, DataTypes } from "sequelize"
import { Attribute } from "sequelize-decorators"
import { Table } from "../sequelize"

@Table("users")
export default class User extends Model {
    @Attribute()
    public username: string

    @Attribute()
    public role: string

    @Attribute()
    public age: number
}

