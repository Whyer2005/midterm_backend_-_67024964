import type {IUserEntity} from "../entity/user.js"
import {createResponseSchema} from "../utils/index.js";
import {z} from "zod";


export interface UserDto extends Omit<IUserEntity, "password"> { }
export interface UserCreateDto extends Omit<IUserEntity, "id"> { }
export interface UserUpdateDto extends IUserEntity { }


export const UserSchema = z.object({
    id : z.number().optional(),
    email : z.string().optional(),
    username : z.string().optional(),
} as Record<keyof  IUserEntity,any>)

export const UserResponseSchema = createResponseSchema(UserSchema)
export const UserListResponseSchema = createResponseSchema(z.array(UserSchema))

