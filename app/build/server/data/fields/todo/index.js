"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const graphql_1 = require("graphql");
const type_1 = require("./type");
const loader_1 = require("./loader");
const todoField = {
    type: type_1.default,
    args: {
        id: { type: graphql_1.GraphQLInt }
    },
    resolve(todo, args, ctx, { rootValue }) {
        return __awaiter(this, void 0, void 0, function* () {
            return loader_1.default.load(args.id);
        });
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = todoField;
//# sourceMappingURL=index.js.map