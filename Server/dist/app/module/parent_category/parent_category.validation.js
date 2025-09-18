"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParnetCategoryValidation = void 0;
const zod_1 = require("zod");
const createParentCategoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
    }),
});
exports.ParnetCategoryValidation = {
    createParentCategoryValidationSchema,
};
