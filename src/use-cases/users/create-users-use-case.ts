import { User } from '@prisma/client'

import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error'
import { UsersRepository } from '../../repositories/users-repository'

interface UsersUseCaseRequest {
  name: string
  email: string
  password: string
}

interface UsersUseCaseResponse {
  user: User
}

export class CreateUsersUseCase {
  constructor(private usersrepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: UsersUseCaseRequest): Promise<UsersUseCaseResponse> {
    const userAlreadyExists = await this.usersrepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    const user = await this.usersrepository.create({
      name,
      email,
      password: passwordHash,
    })

    return { user }
  }
}
