import { User } from '@prisma/client'
import { UsersRepository } from '../repositories/users-repository'

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
    const data = {
      name,
      email,
      password,
    }
    const user = await this.usersrepository.create(data)

    return { user }
  }
}
