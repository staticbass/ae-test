const products = require('../controllers/products')

module.exports = setupProductRoutes

function setupProductRoutes(router) {
  router.get('/products', products.getProducts)
  router.post('/products', products.createProduct)

  return router
}
