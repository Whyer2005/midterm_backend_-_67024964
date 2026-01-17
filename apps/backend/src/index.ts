import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import type { UserDto } from '@repo/domain/dto/user.dto.js'
import { openAPIRouteHandler } from "hono-openapi";
import api from "./api/index.js";
import {swaggerUI} from "@hono/swagger-ui";

const app = new Hono()

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

//register middle ware
app.onError((err, c) => {
  console.error("Error caught:", err)
  return c.json({ error: err.message }, 500)
})


//register routes
app.route('/api',api
)


//open api
app.get('/openapi.json',openAPIRouteHandler(app, {
  documentation : {
    info :{
      title : "API",
      version : "1.0.0",
      description : "API"
    }
  }
}))

app.get('/docs', swaggerUI({ url: '/openapi.json' }))
