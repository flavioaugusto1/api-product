import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '../../../repositories/prisma-repository/prisma-users-repository'
import { CreateUsersUseCase } from '../../../use-cases/users/create-users-use-case'

export async function createUsersController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const requestCreateUserSchema = z.object({
    name: z.string().trim().min(1),
    email: z.string().email(),
    password: z.string().trim().min(6),
  })

  const { name, email, password } = requestCreateUserSchema.parse(request.body)

  const usersRepository = new PrismaUsersRepository()
  const createUsersUseCase = new CreateUsersUseCase(usersRepository)

  const { user } = await createUsersUseCase.execute({ name, email, password })

  const { password: _, ...userWithoutPassword } = user

  return response.status(201).send({ user: userWithoutPassword })
}
