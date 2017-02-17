"use strict";
const Knex = require("knex");
const Bookshelf = require("bookshelf");
const config = require("../config");
const ModelBase = require("bookshelf-modelbase");
exports.knex = Knex(config.db.knex);
exports.bookshelf = Bookshelf(exports.knex);
exports.Model = ModelBase(exports.bookshelf);
exports.bookshelf
    .plugin("registry");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.bookshelf;
//# sourceMappingURL=bookshelf.js.map