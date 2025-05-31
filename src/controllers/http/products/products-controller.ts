import { FastifyInstance } from 'fastify'
import { createProductsController } from './create-products-controller'
import { getProductByIdController } from './get-product-by-id-controller'
import { fetchProdcuts } from './fetch-products-controller'
import { deleteProductsController } from './delete-products-controller'
import { verifyJWT } from '../../middlewares/verify-jwt'

export function productsController(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/new', createProductsController)
  app.get('/:id', getProductByIdController)
  app.get('/list', fetchProdcuts)
  app.delete('/:id/delete', deleteProductsController)
}
