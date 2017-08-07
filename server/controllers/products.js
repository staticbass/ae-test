module.exports = {createProduct, getProducts}

async function createProduct(ctx) {
  const {
    name,
    color
  } = ctx.request.body

  if (!name) {
    ctx.throw(422, '\'name\' field is required', {name})
  }

  try {
    await ctx.db.insert('products', {name, color})
  }
  catch (err) {
    ctx.throw(500, err.message)
  }

  ctx.status = 204
}

async function getProducts(ctx) {
  try {
    ctx.body = await ctx.db.find('products')
  }
  catch (err) {
    ctx.throw(500, err.message)
  }
}
