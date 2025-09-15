import { z } from 'zod';

const availabilitySchema = z.object({
  day: z.string(),
  startTime: z.string().nullable().optional(),
  endTime: z.string().nullable().optional(),
  isAvailable: z.boolean().default(true),
});

export const createServiceSchemaValidation = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    area: z.string().min(1, 'Area is required'),
    price: z.number().nonnegative('Price must be non-negative'),
    is_active: z.boolean().default(false),
    category: z.array(z.string()).nonempty('At least one category is required'),
    availabilities: z
      .array(availabilitySchema)
      .nonempty('Availability is required'),
  }),
});

export const ServiceValidation = {
  createServiceSchemaValidation,
};
