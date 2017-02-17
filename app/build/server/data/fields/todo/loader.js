"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const bluebird_1 = require("bluebird");
const DataLoader = require("dataloader");
const faker = require("faker");
const lodash_1 = require("lodash");
const todos = lodash_1.times(5, (i) => ({
    id: i + 1,
    author: faker.name.firstName(),
    text: faker.lorem.sentence()
}));
const getTodo = (id) => __awaiter(this, void 0, void 0, function* () { return todos
    .find(todo => todo.id === id); });
const todoLoader = new DataLoader(ids => bluebird_1.map(ids, getTodo));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = todoLoader;
//# sourceMappingURL=loader.js.map