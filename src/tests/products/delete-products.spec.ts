import { beforeEach, describe, expect, it } from 'vitest'
import { ProductsRepository } from '../../repositories/products-repository'
import { InMemoryProductsRepository } from '../../repositories/in-memory-repository/in-memory-products-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { DeleteProductsUseCase } from '../../use-cases/products/delete-products-use-case'
import { id } from 'zod/v4/locales'
import { ProductNotFounderError } from '../../errors/product-not-founder-error'

let productsRepository: ProductsRepository
let sut: DeleteProductsUseCase

describe('Delete Products Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new DeleteProductsUseCase(productsRepository)
  })

  it('should be able delete a product', async () => {
    const productCreated = await productsRepository.create({
      name: 'Product 1',
      description: 'Teste description',
      price: new Decimal(1.5),
      stock: 5,
    })

    const productDeleted = await sut.execute({ id: productCreated.id })

    expect(productDeleted).toBeUndefined()
  })

  it('should be not able delete a product inexistent', async () => {
    await productsRepository.create({
      name: 'Product 1',
      description: 'Teste description',
      price: new Decimal(1.5),
      stock: 5,
    })

    expect(async () => {
      await sut.execute({ id: '123' })
    }).rejects.toBeInstanceOf(ProductNotFounderError)
  })
})
