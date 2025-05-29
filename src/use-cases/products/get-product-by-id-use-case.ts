import { Product } from '@prisma/client'
import { ProductsRepository } from '../../repositories/products-repository'
import { ProductNotFounderError } from '../../errors/product-not-founder-error'

interface GetProductByIdUseCaseRequest {
  id: string
}

interface GetProductByIdUseCaseResponse {
  product: Product
}

export class GetProductByIdUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    id,
  }: GetProductByIdUseCaseRequest): Promise<GetProductByIdUseCaseResponse> {
    const product = await this.productsRepository.getProductById(id)

    if (!product) {
      throw new ProductNotFounderError()
    }

    return { product }
  }
}
