"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceOfService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createServiceIntodb = async (req) => {
    const { category, availabilities, ...serviceData } = req.body;
    const user = req.user;
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
                    create: availabilities.map((a) => ({
                        day: a.day,
                        startTime: a.isAvailable ? a.startTime : null,
                        endTime: a.isAvailable ? a.endTime : null,
                        isAvailable: a.isAvailable,
                    })),
                },
                category: {
                    connect: category.map((catId) => ({ id: catId })),
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
                    parent_category: true,
                },
            },
            availabilities: true,
            orders: true,
        },
    });
    return result;
};
const getServiceByIdFromDb = async (serviceId) => {
    const result = await prisma.service.findUnique({
        where: { id: serviceId },
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
                    parent_category: true,
                },
            },
            availabilities: true,
            orders: true,
        },
    });
    return result;
};
exports.ServiceOfService = {
    createServiceIntodb,
    getAllServicesFromDb,
    getServiceByIdFromDb,
};
