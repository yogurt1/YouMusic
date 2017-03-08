import * as Sequelize from "sequelize"
import { Options } from "sequelize-decorators"

const sequelize: Sequelize.Sequelize = new (Sequelize as any)({
    dialect: 'sqlite3',
    storage: './db/dev.sqlite'
})

export const Table = (
    tableName: string,
    opts?: any,
) => Options({ ...opts, sequelize, tableName })

export default sequelize
