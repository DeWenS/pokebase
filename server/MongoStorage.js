import { MongoClient } from 'mongodb'

// Connection URL
let url = 'mongodb://localhost:27017/pokebase'


class MongoStorage {

  async init () {
    this.db = await MongoClient.connect(url)
    // console.log('connected')
  }

  async close () {
    this.db.close()
    // console.log('closed')
  }

  async findBy (collectionName, field, value) {
    let collection = this.db.collection(collectionName)
    return collection.find({[field]: value}).limit(1).toArray()
  }

  async insert (collectionName, object) {
    let collection = this.db.collection(collectionName)
    collection.insert(object)
  }
}

export default MongoStorage
