export class ProductNotFounderError extends Error {
  constructor() {
    super('O produto não foi encontrado!')
  }
}
