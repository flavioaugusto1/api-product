import { Prisma, Product } from '@prisma/client'

export interface ProductsRepository {
  create(data: Prisma.ProductCreateInput): Promise<Product>
  searchProducts(query: string, page: number): Promise<Product[]>
  fetchProducts(): Promise<Product[]>
  update(data: Prisma.ProductCreateInput): Promise<void>
  getProductById(id: string): Promise<Product | null>
}
