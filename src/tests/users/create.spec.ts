import { beforeEach, describe, expect, it } from 'vitest'
import { UsersRepository } from '../../repositories/users-repository'
import { InMemoryUsersRepository } from '../../repositories/in-memory-repository/in-memory-users-repository'
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error'
import { compare } from 'bcryptjs'
import { CreateUsersUseCase } from '../../use-cases/users/create-users-use-case'

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

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Test',
      email: 'test@email.com',
      password: '123456',
    })

    const passwordHashed = await compare('123456', user.password)

    expect(passwordHashed).toBe(true)
  })

  it('should be not able create user with same email', async () => {
    await sut.execute({
      name: 'Test',
      email: 'test@email.com',
      password: '123456',
    })

    expect(async () => {
      await sut.execute({
        name: 'Test',
        email: 'test@email.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
