import { ProductNotFounderError } from '../../errors/product-not-founder-error'
import { ProductsRepository } from '../../repositories/products-repository'

interface DeleteProductsUseCaseRequest {
  id: string
}

export class DeleteProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ id }: DeleteProductsUseCaseRequest) {
    const product = await this.productsRepository.getProductById(id)

    if (!product) {
      throw new ProductNotFounderError()
    }

    await this.productsRepository.delete(id)
  }
}
