const MongoLib = require('../lib/mongo')

class FoodService {
  constructor () {
    this.collection = 'food'
    this.mongoDB = new MongoLib()
  }

  async getFoodList ({ tags }) {
    const query = tags && { tags: { $in: tags } }
    console.log('query', query)
    const food = await this.mongoDB.getAll(this.collection, query)
    return food || []
  }

  async getFood ({ foodId }) {
    const food = await this.mongoDB.getOne(this.collection, foodId)
    return food || []
  }

  async createFood ({ food }) {
    const foodData = this.mongoDB.createOne(this.collection, food)
    return foodData || []
  }

  updateFood ({ foodId, food }) {
    const foodData = this.mongoDB.updateOne(this.collection, foodId, food)
    return foodData || []
  }

  deleteFood ({ foodId }) {
    console.log('delete')
    const foodData = this.mongoDB.deleteOne(this.collection, foodId)
    return foodData || []
  }
}

module.exports = FoodService
