import { compare } from 'bcryptjs'

import { User } from '@prisma/client'
import { UsersRepository } from '../../repositories/users-repository'
import { InvalidCredentialsError } from '../../errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
