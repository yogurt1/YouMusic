import { Model, DataTypes } from "sequelize"
import { Attribute } from "sequelize-decorators"
import { Table } from "../sequelize"
import User from "./user"

@Table("todos")
export default class Todo extends Model {
    @Attribute()
    public name: string

    @Attribute(DataTypes.TEXT("long"))
    public text: string

    static associate(): void {
        Todo.belongsTo(User)
    }
}
