"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCategoryService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createServiceCategory = async (req) => {
    const data = req.body;
    const result = await prisma.service_Category.create({
        data: {
            ...data,
            parent_category: {
                connect: {
                    id: data.parent_category,
                },
            },
        },
    });
    return result;
};
const getAllServiceCategory = async () => {
    const result = await prisma.service_Category.findMany();
    return result;
};
exports.ServiceCategoryService = {
    createServiceCategory,
    getAllServiceCategory,
};
