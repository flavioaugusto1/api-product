import { beforeEach, describe, expect, it } from 'vitest'
import { ProductsRepository } from '../../repositories/products-repository'
import { CreateProductsUseCase } from '../../use-cases/products/create-products-use-case'
import { InMemoryProductsRepository } from '../../repositories/in-memory-repository/in-memory-products-repository'
import { Decimal } from '@prisma/client/runtime/library'

let productsRepository: ProductsRepository
let sut: CreateProductsUseCase

describe('Products Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new CreateProductsUseCase(productsRepository)
  })

  it('should be able create a product', async () => {
    const { product } = await sut.execute({
      name: 'Product 1',
      description: 'Teste description',
      price: new Decimal(1.5),
      stock: 5,
    })

    expect(product.id).toEqual(expect.any(String))
  })
})
