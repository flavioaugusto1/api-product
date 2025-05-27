import { beforeEach, describe, expect, it } from 'vitest'
import { UsersRepository } from '../../repositories/users-repository'
import { InMemoryUsersRepository } from '../../repositories/in-memory-repository/in-memory-users-repository'
import { CreateUsersUseCase } from '../../use-cases/create-users-use-case'

let usersRepository: UsersRepository
let sut: CreateUsersUseCase

describe('Users use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUsersUseCase(usersRepository)
  })

  it('should be able create a user', async () => {
    const { user } = await sut.execute({
      name: 'Test',
      email: 'test@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be not able create user with same email', async () => {})
})
