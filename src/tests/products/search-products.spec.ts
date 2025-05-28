import { beforeEach, describe, expect, it } from 'vitest'
import { ProductsRepository } from '../../repositories/products-repository'
import { InMemoryProductsRepository } from '../../repositories/in-memory-repository/in-memory-products-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { SearchProductsUseCase } from '../../use-cases/products/search-products-use-case'

let productsRepository: ProductsRepository
let sut: SearchProductsUseCase

describe('Search Products Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new SearchProductsUseCase(productsRepository)
  })

  it('should be able search products', async () => {
    await productsRepository.create({
      name: 'Product 1',
      description: 'Teste description',
      price: new Decimal(1.5),
      stock: 5,
    })

    const { products } = await sut.execute({ query: 'Product 1', page: 1 })

    expect(products).toHaveLength(1)
  })
})
