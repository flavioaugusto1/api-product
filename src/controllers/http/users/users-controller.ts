import { FastifyInstance } from 'fastify'
import { createUsersController } from './create-users-controller'
import { authenticateUsersController } from './authenticate-users-controller'

export async function usersController(app: FastifyInstance) {
  app.post('/signup', createUsersController)
  app.post('/signin', authenticateUsersController)
}
