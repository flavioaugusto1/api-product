import { beforeEach, describe, expect, it } from 'vitest'
import { ProductsRepository } from '../../repositories/products-repository'
import { InMemoryProductsRepository } from '../../repositories/in-memory-repository/in-memory-products-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { GetProductByIdUseCase } from '../../use-cases/products/get-product-by-id-use-case'
import { ProductNotFounderError } from '../../errors/product-not-founder-error'

let productsRepository: ProductsRepository
let sut: GetProductByIdUseCase

describe('Get Product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new GetProductByIdUseCase(productsRepository)
  })

  it('should be able get product by id', async () => {
    const newProduct = await productsRepository.create({
      name: 'Product 1',
      description: 'Teste description',
      price: new Decimal(1.5),
      stock: 5,
    })

    const { product } = await sut.execute({ id: newProduct.id })

    expect(product).toEqual(
      expect.objectContaining({
        id: newProduct.id,
        name: 'Product 1',
      }),
    )
  })

  it('should be not able get invalid product', async () => {
    await productsRepository.create({
      name: 'Product 1',
      description: 'Teste description',
      price: new Decimal(1.5),
      stock: 5,
    })

    await expect(async () => {
      await sut.execute({ id: '123' })
    }).rejects.toBeInstanceOf(ProductNotFounderError)
  })
})
