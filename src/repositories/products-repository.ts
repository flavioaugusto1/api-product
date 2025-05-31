import { Prisma, Product } from '@prisma/client'

export interface ProductsRepository {
  create(data: Prisma.ProductCreateInput): Promise<Product>
  update(data: Prisma.ProductCreateInput): Promise<Product>
  delete(id: string): Promise<void>
  searchProducts(query?: string, page?: number): Promise<Product[]>
  fetchProducts(): Promise<Product[]>
  getProductById(id: string): Promise<Product | null>
}
