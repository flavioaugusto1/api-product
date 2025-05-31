import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaProductsRepository } from '../../../repositories/prisma-repository/prisma-products-repository'
import { DeleteProductsUseCase } from '../../../use-cases/products/delete-products-use-case'

export async function deleteProductsController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const requestDeleteSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = requestDeleteSchema.parse(request.params)

  const productsRepository = new PrismaProductsRepository()
  const deleteProductsUseCase = new DeleteProductsUseCase(productsRepository)

  await deleteProductsUseCase.execute({ id })

  return response.status(204).send()
}
