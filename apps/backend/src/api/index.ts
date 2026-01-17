import {UserService} from "../services/user.js"
import {UserRepositorySqlite} from "../repository/sqlite/user.js"
import {CreateUserRequest} from "@repo/domain/request/user.js";
import {zValidator} from "@hono/zod-validator"
import {type UserCreateDto, UserListResponseSchema, UserResponseSchema} from "@repo/domain/dto/user.dto.js";
import {Hono} from 'hono'
import {describeRoute, resolver} from "hono-openapi";
import {createValidator} from "../utils/index.js";
import { PolicyService } from "../services/policy.js";
import { PolicyRepositorySqlite } from "../repository/sqlite/policy.js";
import { CreatePolicyRequest } from "@repo/domain/request/policy.js";
import { PolicyListResponseSchema, PolicySchema } from "@repo/domain/dto/policy.dto.js";


let userService = new UserService(new UserRepositorySqlite());
let policyService = new PolicyService(new PolicyRepositorySqlite());


const api = new Hono()


api.get('/users',
    describeRoute({
        description : "List of users",
        responses : {
            200 : {
                description : "Successful response",
                content : {
                    "application/json": {
                        schema : resolver(UserListResponseSchema)
                    }
                }
            }
        }
    }),
    (c) => {

        let data = userService.findAllUser();
        return c.json({"message": "Get User List", data: data})
    })


let createUserRequest = CreateUserRequest.extend({}).refine((data) => data.password === data.password_confirmation, {
    error: "Passwords do not match",
    path: ["password"],
})

api.get('/policies',
    describeRoute({
        description: "List of policies",
        responses: {
            200: {
                description: "Successful response",
                content: {
                    "application/json": {
                        schema: resolver(PolicyListResponseSchema)
                    }
                }
            }
        }
    }),
    (c) => {
        let data = policyService.findAll();
        return c.json({
            message: "Get Policy List",
            data
        });
    }
)
api.post('/policies',
    describeRoute({
        description: "Create Policy",
        responses: {
            200: {
                description: "Successful response",
                content: {
                    "application/json": {
                        schema: resolver(PolicySchema)
                    }
                }
            }
        }
    }),
    createValidator("json", CreatePolicyRequest),
    async (c) => {
        const data = c.req.valid("json");
        let result = await policyService.create(data);


        return c.json({
            message: "Policy Created",
            data: result
        });
    }
)


api.post('/users',
    describeRoute({
        description : "Create User",
        responses : {
            200 : {
                description : "Successful response",
                content : {
                    "application/json": {
                        schema : resolver(UserResponseSchema)
                    }
                }
            }
        }
    }),
    createValidator("json",createUserRequest)
    , async (c) => {

        const data = c.req.valid("json")
        const dto: UserCreateDto = {
            email: data.email,
            password: data.password,
            username: data.username,
        }
        let result = await userService.create(dto);

        return c.json({
            message: "User Created",
            data: result
        })
    })


export default api

