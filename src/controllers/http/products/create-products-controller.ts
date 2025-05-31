import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaProductsRepository } from '../../../repositories/prisma-repository/prisma-products-repository'
import { CreateProductsUseCase } from '../../../use-cases/products/create-products-use-case'

export function createProductsController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const createProductsBodySchema = z.object({
    name: z.string().trim().min(1),
    price: z.coerce.number(),
    description: z.string().optional().default(''),
    stock: z.coerce.number().min(1),
  })

  const { name, price, description, stock } = createProductsBodySchema.parse(
    request.body,
  )

  const productsRepository = new PrismaProductsRepository()
  const productsUseCase = new CreateProductsUseCase(productsRepository)

  const product = productsUseCase.execute({ name, description, price, stock })

  return response.status(201).send({ product })
}
