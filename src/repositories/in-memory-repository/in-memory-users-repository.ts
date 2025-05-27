import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
    }

    this.users.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => {
      return user.email === email
    })

    if (!user) {
      return null
    }

    return user
  }
}
