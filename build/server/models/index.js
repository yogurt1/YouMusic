"use strict";
const fs = require("fs");
const path = require("path");
const bookshelf_1 = require("../bookshelf");
const { name: basename, ext: baseext } = path.parse(__filename);
fs.readdirSync(__dirname)
    .map(name => path.parse(name))
    .filter(v => (v.name !== basename &&
    v.ext === baseext))
    .map(v => require(`./${v.name}`).default)
    .forEach(model => bookshelf_1.default
    .model(model.name, model));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bookshelf_1.default._registry;
//# sourceMappingURL=index.js.map