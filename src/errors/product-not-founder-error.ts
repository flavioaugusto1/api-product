import { AppError } from './app-error'

export class ProductNotFounderError extends AppError {
  constructor() {
    super(404, 'O produto não foi encontrado!')
  }
}
