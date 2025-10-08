/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

const prisma = new PrismaClient();
const createServiceIntodb = async (req: Request) => {
  const { category, availabilities, ...serviceData } = req.body;
  const user = (req as any).user;
  const providerData = await prisma.service_Provider.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const result = await prisma.$transaction(async (trns) => {
    // Create the service with nested availabilities + categories
    const createService = await trns.service.create({
      data: {
        ...serviceData,
        availabilities: {
          create: availabilities.map((a: any) => ({
            day: a.day,
            startTime: a.isAvailable ? a.startTime : null,
            endTime: a.isAvailable ? a.endTime : null,
            isAvailable: a.isAvailable,
          })),
        },
        category: {
          connect: category.map((catId: string) => ({ id: catId })),
        },
      },
    });

    // Link provider to service
    const setProvider = await trns.providerServices.create({
      data: {
        providerId: providerData.id,
        serviceId: createService.id,
      },
    });

    return {
      createService,
      setProvider,
    };
  });

  return result;
};

const getAllServicesFromDb = async () => {
  const result = await prisma.service.findMany({
    include: {
      providerServices: {
        include: {
          service_provider: {
            include: { user: true },
          },
        },
      },
      category: {
        include: {
          parent_category: true, // add this if you want parent info
        },
      },
    },
  });

  return result;
};

const getServiceByIdFromDb = async (serviceId: string) => {
  const result = await prisma.service.findUnique({
    where: { id: serviceId },
    include: {
      providerServices: true,
      category: true,
    },
  });
  return result;
};
export const ServiceOfService = {
  createServiceIntodb,
  getAllServicesFromDb,
  getServiceByIdFromDb,
};
