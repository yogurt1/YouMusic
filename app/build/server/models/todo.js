"use strict";
const Joi = require("joi");
const bookshelf_1 = require("../bookshelf");
class Todo extends bookshelf_1.Model {
    constructor() {
        super(...arguments);
        this.validate = {
            text: Joi.string()
        };
    }
    get tableName() {
        return "todos";
    }
    user() {
        return this.hasOne("User");
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Todo;
//# sourceMappingURL=todo.js.map