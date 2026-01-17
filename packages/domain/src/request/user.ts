import { z } from "zod"
import { type IUser } from "../entity/user.js"

type CreateUserRequestType = Partial<Record<keyof IUser, unknown>> | { password_confirmation: string }

export const CreateUserRequest = z.object({
    username: z.string().min(3).max(50),
    password: z.string().min(6),
    password_confirmation: z.string(),
    email: z.email(),
} as CreateUserRequestType)

