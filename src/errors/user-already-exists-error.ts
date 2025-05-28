export class UserAlreadyExistsError extends Error {
  constructor() {
    super('O usuário informado já existe!')
  }
}
