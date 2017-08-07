const Koa = require('koa')
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const Router = require('koa-router')
const setupProductRoutes = require('./routes/products')
const path = require('path')
const db = require('./db')
const config = require('../config')

module.exports = {run}

async function run() {
  const env = process.env.NODE_ENV || 'development'
  const isDev = env === 'development'
  const {port, db: {url, name}} = config[env]
  const app = new Koa()
  const apiRoute = new Router({prefix: '/api'})
  const publicPath = path.join(__dirname, '../public')

  setupProductRoutes(apiRoute)

  isDev && app.use(logger())
  app.use(serve(publicPath))
  app.use(bodyParser())
  app.use(apiRoute.routes())

  const [server] = await Promise.all([
    listen(app, port),
    db.connect(`${url}/${name}`)
  ]).catch((err) => console.log(err))

  app.context.db = db

  isDev && console.log(`Connected to ${url}/${name}`)
  isDev && console.log(`Sever started at ${port}`)

  return {server, db}
}

function listen(app, port) {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, (err) => {
      if (err) {
        return reject(err)
      }
      resolve(server)
    })
  })
}

