import { AppError } from './app-error'

export class UserAlreadyExistsError extends AppError {
  constructor() {
    super(404, 'O usuário informado já existe!')
  }
}
