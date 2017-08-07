const request = require('supertest')
const expect = require('chai').expect
const {run} = require('../app')

describe('Products API', () => {

  let db = null
  let server = null
  const testProduct = {name: 'test', color: 'test'}

  before(async () => {
    const connections = await run()
    db = connections.db
    server = connections.server
  })

  it('should post product', async () => {
    await request(server)
      .post('/api/products')
      .send(testProduct)
      .expect(204)
  })

  it('should get all products', async () => {
    await request(server)
      .get('/api/products')
      .expect(200)
      .then(({body}) => {
        const {name, color} = body[0]
        expect({name, color}).to.deep.equal(testProduct)
      })
  })

  after(async () => {
    await db.dropCollection('products')
    await db.close()
  })

})