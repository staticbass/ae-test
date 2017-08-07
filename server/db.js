const mongoClient = require('mongodb').MongoClient

let db = null

module.exports = {
  connect,
  close,
  dropCollection,
  insert,
  find,
  connection: db
}

function connect(url) {
  return new Promise((resolve, reject) => {
    mongoClient.connect(url, (err, connection) => {
      if (err) {
        return reject(err)
      }
      db = connection
      resolve()
    })
  })
}

function close() {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        return reject(err)
      }
      resolve()
    })
  })
}

function dropCollection(collectionName) {
  return new Promise((resolve, reject) => {
    db.collection(collectionName).drop((err) => {
      if (err) {
        return reject(err)
      }
      resolve()
    })
  })
}

function insert(collectionName, document) {
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName)

    collection.insertMany([document], (err, result) => {
      if (err) {
        return reject(err)
      }
      resolve(result)
    })
  })
}

function find(collectionName, query = {}) {
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName)

    collection.find(query).toArray((err, documents) => {
      if (err) {
        return reject(err)
      }
      resolve(documents)
    })
  })
}
