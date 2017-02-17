require("any-promise/register/bluebird")
require("any-observable/register/rxjs-all")
require("app-module-path/cwd")
require("dotenv").config({ silent: true })

global.Promise = require("any-promise")
global.Observable = require("any-observable")

const gql = require("graphql-tag")
const fs = require("fs")

require.extensions[".gql"] =
    require.extensions[".graphql"] = (module, filename) => {
        const content = fs.readFileSync(filename, "utf-8")
        try {
            module.exports = JSON.parse(gql`${content}`)
        } catch (err) {
            err.message = `${filename}:${err.message}`
            throw err
        }
    }
