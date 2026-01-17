import { Hono } from 'hono'

const policy = new Hono()

// GET /policy
policy.get('/', (c) => {
  return c.json({
    message: 'Get all policies'
  })
})

// POST /policy
policy.post('/', async (c) => {
  const body = await c.req.json()

  return c.json({
    message: 'Create policy success',
    data: body
  })
})

export default policy
