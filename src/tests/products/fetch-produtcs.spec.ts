import { beforeEach, describe, expect, it } from 'vitest'
import { ProductsRepository } from '../../repositories/products-repository'
import { InMemoryProductsRepository } from '../../repositories/in-memory-repository/in-memory-products-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { FetchProductsUseCase } from '../../use-cases/products/fetch-products-use-case'

let productsRepository: ProductsRepository
let sut: FetchProductsUseCase

describe('Search Products Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new FetchProductsUseCase(productsRepository)
  })

  it('should be able search products', async () => {
    await productsRepository.create({
      name: 'Product 1',
      description: 'Teste description',
      price: new Decimal(1.5),
      stock: 5,
    })

    await productsRepository.create({
      name: 'Product 2',
      description: 'Teste description',
      price: new Decimal(1.5),
      stock: 5,
    })

    const { products } = await sut.execute()

    expect(products).toHaveLength(2)
  })
})
