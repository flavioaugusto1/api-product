import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaProductsRepository } from '../../../repositories/prisma-repository/prisma-products-repository'
import { FetchProductsUseCase } from '../../../use-cases/products/fetch-products-use-case'

export async function fetchProdcuts(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const productsRepository = new PrismaProductsRepository()
  const fetchProductsUseCase = new FetchProductsUseCase(productsRepository)

  const products = fetchProductsUseCase.execute()

  return response.status(200).send({ products })
}
