import { Prisma, Product } from '@prisma/client'
import { ProductsRepository } from '../products-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryProductsRepository implements ProductsRepository {
  private products: Product[] = []

  async create(data: Prisma.ProductCreateInput) {
    const product = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      price: new Prisma.Decimal(data.price.toString()),
      stock: data.stock,
    }

    this.products.push(product)

    return product
  }

  async searchProducts(query: string, page: number) {
    const products = this.products
      .filter((product) => product.name.includes(query))
      .slice((page - 1) * 10, page * 10)

    return products
  }

  async fetchProducts() {
    return this.products
  }

  async getProductById(id: string) {
    const product = this.products.find((item) => item.id === id)

    if (!product) {
      return null
    }

    return product
  }

  // update(data: Prisma.ProductCreateInput): Promise<void> {
  //   throw new Error('Method not implemented.')
  // }
}
