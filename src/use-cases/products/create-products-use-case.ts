import { ProductsRepository } from '../../repositories/products-repository'
import { Product } from '@prisma/client'

interface CreateProductsUseCaseRequest {
  name: string
  price: number
  description: string
  stock: number
}

interface CreateProductsUseCaseResponse {
  product: Product
}

export class CreateProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
    description,
    price,
    stock,
  }: CreateProductsUseCaseRequest): Promise<CreateProductsUseCaseResponse> {
    const product = await this.productsRepository.create({
      name,
      description,
      price,
      stock,
    })

    return { product }
  }
}
