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

  async update({
    id,
    name,
    description,
    price,
    stock,
  }: Prisma.ProductCreateInput): Promise<Product> {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
        stock,
      },
    })

    return product
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({
      where: {
        id,
      },
    })
  }

  async searchProducts(query: string, page: number): Promise<Product[]> {
    console.log(query, page)
    const product = await prisma.product.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      skip: (page - 1) * 10,
      take: 10,
    })

    return product
  }

  async fetchProducts(): Promise<Product[]> {
    return await prisma.product.findMany({
      orderBy: {
        created_at: 'asc',
      },
    })
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
