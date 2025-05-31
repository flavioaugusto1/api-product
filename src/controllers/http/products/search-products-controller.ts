import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaProductsRepository } from '../../../repositories/prisma-repository/prisma-products-repository'
import { SearchProductsUseCase } from '../../../use-cases/products/search-products-use-case'

export async function searchProductsController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const requestQuerySchema = z.object({
    query: z.string().optional(),
    page: z.coerce.number().default(1),
  })

  const { query, page } = requestQuerySchema.parse(request.query)

  const productsRepository = new PrismaProductsRepository()
  const searchProductsUseCase = new SearchProductsUseCase(productsRepository)

  const { products } = await searchProductsUseCase.execute({ query, page })

  return response.status(200).send({ products })
}
