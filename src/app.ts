import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env'
import { usersController } from './controllers/http/users/users-controller'
import { productsController } from './controllers/http/products/products-controller'
import { ZodError } from 'zod'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(usersController, { prefix: '/user' })
app.register(productsController, { prefix: '/products' })

app.setErrorHandler((error, request, response) => {
  if (error instanceof ZodError) {
    return response
      .status(400)
      .send({ message: 'Validation error!', issue: error.format() })
  }

  return response.status(500).send({
    message: 'Internal server error!',
  })
})
