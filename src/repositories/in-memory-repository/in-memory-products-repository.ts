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

  async delete(id: string): Promise<void> {
    this.products = await this.products.filter((product) => product.id !== id)
  }

  async update(data: Prisma.ProductCreateInput) {
    const findIndexProduct = await this.products.findIndex(
      (product) => product.id === data.id,
    )

    const product = this.products[findIndexProduct]

    const updatedProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    }

    this.products[findIndexProduct] = updatedProduct

    return updatedProduct
  }
}
