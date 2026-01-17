import {z, type ZodType} from 'zod';

export function createResponseSchema<T extends ZodType<any>>(dataSchema: T) {
    return z.object({
        message: z.string(),
        data: z.union([dataSchema, z.array(dataSchema)]),
    });
}