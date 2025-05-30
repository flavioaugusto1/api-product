import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AuthenticateUseCase } from '../../../use-cases/users/authenticate-use-case'
import { PrismaUsersRepository } from '../../../repositories/prisma-repository/prisma-users-repository'

export async function authenticateUsersController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().trim().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  const usersRepository = new PrismaUsersRepository()
  const authenticateUser = new AuthenticateUseCase(usersRepository)

  const { user } = await authenticateUser.execute({ email, password })

  const token = await response.jwtSign(
    {},
    {
      sign: {
        sub: user.id,
        expiresIn: '1d',
      },
    },
  )

  const { password: _, ...userWithoutPassword } = user

  return response.status(200).send({
    user: userWithoutPassword,
    token,
  })
}
