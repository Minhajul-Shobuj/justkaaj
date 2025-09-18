"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = exports.createServiceSchemaValidation = void 0;
const zod_1 = require("zod");
const availabilitySchema = zod_1.z.object({
    day: zod_1.z.string(),
    startTime: zod_1.z.string().nullable().optional(),
    endTime: zod_1.z.string().nullable().optional(),
    isAvailable: zod_1.z.boolean().default(true),
});
exports.createServiceSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required'),
        description: zod_1.z.string().min(1, 'Description is required'),
        area: zod_1.z.string().min(1, 'Area is required'),
        price: zod_1.z.number().nonnegative('Price must be non-negative'),
        is_active: zod_1.z.boolean().default(false),
        category: zod_1.z.array(zod_1.z.string()).nonempty('At least one category is required'),
        availabilities: zod_1.z
            .array(availabilitySchema)
            .nonempty('Availability is required'),
    }),
});
exports.ServiceValidation = {
    createServiceSchemaValidation: exports.createServiceSchemaValidation,
};
