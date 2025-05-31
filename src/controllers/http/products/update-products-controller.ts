import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaProductsRepository } from '../../../repositories/prisma-repository/prisma-products-repository'
import { UpdateProductsUseCase } from '../../../use-cases/products/update-products-use-case'

export async function updateProductsController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const requestBodySchema = z.object({
    name: z.string().trim().min(1).optional(),
    price: z.coerce.number().optional(),
    description: z.string().trim().optional(),
    stock: z.coerce.number().optional(),
  })

  const requestParamSchema = z.object({
    id: z.string().uuid(),
  })

  const { name, description, price, stock } = requestBodySchema.parse(
    request.body,
  )

  const { id } = requestParamSchema.parse(request.params)

  const productsRepository = new PrismaProductsRepository()
  const updateProducsUseCase = new UpdateProductsUseCase(productsRepository)

  const { product } = await updateProducsUseCase.execute({
    id,
    name,
    description,
    price,
    stock,
  })

  return response.status(200).send({ product })
}
