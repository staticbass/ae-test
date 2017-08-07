module.exports = {
  development: {
    host: '127.0.0.1',
    port: 7000,
    db: {
      url: 'mongodb://localhost:27017',
      name: 'dev-agile-engine'
    }
  },
  test: {
    host: '127.0.0.1',
    port: 7000,
    db: {
      url: 'mongodb://localhost:27017',
      name: 'test-agile-engine'
    }
  },
  production: {}
}