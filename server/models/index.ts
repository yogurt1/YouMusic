import * as fs from "fs"
import * as path from "path"
import bookshelf from "../bookshelf"

const {
    name: basename,
    ext: baseext
} = path.parse(__filename)

const modelRegistry: {
    [key: string]: bookshelf.Model
} = fs.readdirSync(__dirname)
    .map(name => path.parse(name))
    .filter(v => (
        v.name !== basename &&
        v.ext === baseext
    ))
    .map(v => v.name)
    .map(name => require(`./${name}`).default)
    .map(M => bookshelf.model(M.name, M))
    .reduce((ac, M) => {
        ac[M.name] = M
        return ac
    }, {})

export default modelRegistry
