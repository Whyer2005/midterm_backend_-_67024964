import {zValidator} from "@hono/zod-validator";
import type {Context, ValidationTargets} from "hono";
import type {ZodObject, ZodType} from "zod";

export function createValidator<T extends  ZodType>(
    target: keyof ValidationTargets, schema: T
) {
    return zValidator(target, schema, (result, c: Context) => {
        if (!result.success) {
            return c.json({ error: result.error.issues }, 400)
        }
    })
}
