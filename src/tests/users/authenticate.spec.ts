import { beforeEach, describe, expect, it } from 'vitest'
import { UsersRepository } from '../../repositories/users-repository'
import { InMemoryUsersRepository } from '../../repositories/in-memory-repository/in-memory-users-repository'
import { InvalidCredentialsError } from '../../errors/invalid-credentials-error'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from '../../use-cases/users/authenticate-use-case'

let usersRepository: UsersRepository
let sut: AuthenticateUseCase

describe('Users use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Test',
      email: 'test@email.com',
      password: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'test@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be not able authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Test',
      email: 'test@email.com',
      password: '123456',
    })

    expect(async () => {
      await sut.execute({
        email: 'test@email.com',
        password: '1234',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be not able authenticate with wrong e-mail', async () => {
    await usersRepository.create({
      name: 'Test',
      email: 'test@email.com',
      password: await hash('123456', 6),
    })

    expect(async () => {
      await sut.execute({
        email: 'test2@email.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
