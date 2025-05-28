import { Product } from '@prisma/client'
import { ProductsRepository } from '../../repositories/products-repository'

interface FetchProductsUseCaseResponse {
  products: Product[]
}

export class FetchProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(): Promise<FetchProductsUseCaseResponse> {
    const products = await this.productsRepository.fetchProducts()
    return { products }
  }
}
