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


type Policy = {
  PolicyID: number
  Coverage: string
  Premium: number
  StartDate: string
  EndDate: string
}

let policies: Policy[] = []
let policyId = 1

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

api.post('/policies', async (c) => {
  const body = await c.req.json()

  const policy: Policy = {
    PolicyID: policyId++,
    Coverage: body.Coverage,
    Premium: body.Premium,
    StartDate: body.StartDate,
    EndDate: body.EndDate
  }
  policies.push(policy)

  return c.json({
    message: 'Policy created',
    data: policy
  })
})

// READ ALL
api.get('/policies', (c) => {
  return c.json({
    message: 'Policy list',
    data: policies
  })
})

// READ BY ID
api.get('/policies/:id', (c) => {
  const policy = policies.find(
    p => p.PolicyID === Number(c.req.param('id'))
  )
  if (!policy) {
    return c.json({ message: 'Not found' }, 404)
  }
  return c.json(policy)
})


// UPDATE
api.put('/policies/:id', async (c) => {
  const index = policies.findIndex(
    p => p.PolicyID === Number(c.req.param('id'))
  )

  if (index === -1) {
    return c.json({ message: 'Not found' }, 404)
  }

  const body = await c.req.json()

  policies[index] = {
    ...policies[index],
    ...body
  }

  return c.json({
    message: 'Updated',
    data: policies[index]
  })
})

// DELETE
api.delete('/policies/:id', (c) => {
  const index = policies.findIndex(
    p => p.PolicyID === Number(c.req.param('id'))
  )

  if (index === -1) {
    return c.json({ message: 'Not found' }, 404)
  }

  policies.splice(index, 1)
  return c.json({ message: 'Deleted' })
})



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

