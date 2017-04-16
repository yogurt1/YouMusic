import * as fs from "fs"
import * as path from "path"
import * as R from 'ramda'

const readdirAsync = (p: string): Promise<string[]> => new Promise<string[]>(
    (resolve, reject) => {
        fs.readdir(p, (error, list) => {
            if (error) {
                reject(error)
                return
            }

            resolve(list)
        })
    }
)

const {
    name: basename,
    ext: baseext
} = path.parse(__filename)

const formatList = R.reduce(
    (acc, file) => {
        const parsed = path.parse(name)
        return (
            parsed.name !== basename &&
            parsed.ext === baseext
        )
            ? [...acc, file]
            : acc
    },
    []
)

const loadModels = async (loader: any) => {
    const loadAndAssoc = async ({ name }: path.ParsedPath) => {
        const { default: model } = await loader.import(`./${name}`)
        await model.assoc()
    }

    const rawFileList = await readdirAsync(__dirname)
    const fileList = formatList(rawFileList)

    await Promise.all(
        R.map(loadAndAssoc, fileList)
    )
}

export default loadModels
