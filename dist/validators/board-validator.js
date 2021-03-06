"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardCreateValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const boardCreateValidator = (data) => {
    const title = joi_1.default.string().min(2).max(100);
    const schema = joi_1.default.object({
        title: title.required(),
    });
    return schema.validate(data);
};
exports.boardCreateValidator = boardCreateValidator;
//# sourceMappingURL=board-validator.js.map