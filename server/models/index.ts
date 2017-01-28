import * as fs from "fs"
import * as path from "path"
import bookshelf, { Model } from "../bookshelf"

const {
    name: basename,
    ext: baseext
} = path.parse(__filename)

fs.readdirSync(__dirname)
    .map(name => path.parse(name))
    .filter(v => (
        v.name !== basename &&
        v.ext === baseext
    ))
    .map(v => require(`./${v.name}`).default)
    .forEach(model => bookshelf
         .model(model.name, model))

export default bookshelf._registry
