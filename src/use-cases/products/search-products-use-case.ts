import { Product } from '@prisma/client'
import { ProductsRepository } from '../../repositories/products-repository'

interface SearchProductsUseCaseRequest {
  query?: string
  page: number
}

interface SearchProductsUseCaseResponse {
  products: Product[]
}

export class SearchProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    query,
    page,
  }: SearchProductsUseCaseRequest): Promise<SearchProductsUseCaseResponse> {
    const products = await this.productsRepository.searchProducts(query, page)
    return { products }
  }
}
