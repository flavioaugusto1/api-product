import { Prisma, Product } from '@prisma/client'
import { ProductsRepository } from '../products-repository'
import { prisma } from '../../lib/prisma'

export class PrismaProductsRepository implements ProductsRepository {
  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    const product = await prisma.product.create({
      data,
    })

    return product
  }

  update(data: Prisma.ProductUpdateInput): Promise<Product> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({
      where: {
        id,
      },
    })
  }

  searchProducts(query: string, page: number): Promise<Product[]> {
    throw new Error('Method not implemented.')
  }

  async fetchProducts(): Promise<Product[]> {
    return await prisma.product.findMany()
  }

  async getProductById(id: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    })

    if (!product) {
      return null
    }

    return product
  }
}
