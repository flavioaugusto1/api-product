import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env'
import { usersController } from './controllers/http/users/users-controller'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(usersController, { prefix: '/user' })
