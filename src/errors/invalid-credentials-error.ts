import { AppError } from './app-error'

export class InvalidCredentialsError extends AppError {
  constructor() {
    super(401, 'E-mail e/ou senha inválidos')
  }
}
