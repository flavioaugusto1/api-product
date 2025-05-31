import { FastifyInstance } from 'fastify'
import { createProductsController } from './create-products-controller'

export function productsController(app: FastifyInstance) {
  app.post('/new', createProductsController)
}
