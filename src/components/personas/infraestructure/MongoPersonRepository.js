import MongoLib from '../../../lib/mongo'

class MongoPersonRepository { // implement an interface
  constructor () {
    // super()
    this.collection = 'personas'
    this.mongoDB = new MongoLib()
  }

  async add (person) {
    const _id = await this.mongoDB.create(this.collection, person)
    return { _id, ...person }
  }

  async delete ({ id }) {
    return this.mongoDB.delete(this.collection, id)
  }

  async getById ({ id }) {
    return await this.mongoDB.get(this.collection, id)
  }

  async getAll () {
    return this.mongoDB.getAll(this.collection)
  }
}

export default MongoPersonRepository
