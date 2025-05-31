import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaProductsRepository } from '../../../repositories/prisma-repository/prisma-products-repository'
import { GetProductByIdUseCase } from '../../../use-cases/products/get-product-by-id-use-case'

export async function getProductByIdController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const requestParamSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = requestParamSchema.parse(request.params)

  const productsRepository = new PrismaProductsRepository()
  const getProductByIdUseCase = new GetProductByIdUseCase(productsRepository)

  const { product } = await getProductByIdUseCase.execute({ id })

  return response.status(200).send({ product })
}
