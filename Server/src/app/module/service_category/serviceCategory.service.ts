import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
const prisma = new PrismaClient();

const createServiceCategory = async (req: Request) => {
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
const getAllServiceCategory = async (pcategoryId: string) => {
  const result = await prisma.service_Category.findMany({
    where: {
      parent_categoryId: pcategoryId,
    },
  });
  return result;
};

export const ServiceCategoryService = {
  createServiceCategory,
  getAllServiceCategory,
};
