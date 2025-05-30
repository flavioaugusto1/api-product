import { Decimal } from '@prisma/client/runtime/library'
import { ProductsRepository } from '../../repositories/products-repository'
import { ProductNotFounderError } from '../../errors/product-not-founder-error'
import { Product } from '@prisma/client'

interface UpdateProductsUseCaseRequest {
  id: string
  name?: string
  price?: Decimal
  description?: string
  stock?: number
}

interface UpdateProductsUseCaseResponse {
  product: Product
}

export class UpdateProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    id,
    name,
    description,
    price,
    stock,
  }: UpdateProductsUseCaseRequest): Promise<UpdateProductsUseCaseResponse> {
    const verifyExists = await this.productsRepository.getProductById(id)

    if (!verifyExists) {
      throw new ProductNotFounderError()
    }

    const product = await this.productsRepository.update({
      id,
      name,
      description,
      price,
      stock,
    })

    return { product }
  }
}
