"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PCategoryService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createParentCategory = async (req) => {
    const result = await prisma.parent_category.create({
        data: req.body,
    });
    return result;
};
const getAllParentCategory = async () => {
    const result = await prisma.parent_category.findMany();
    return result;
};
exports.PCategoryService = {
    createParentCategory,
    getAllParentCategory,
};
