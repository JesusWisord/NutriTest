const assert = require('assert')
const proxyquire = require('proxyquire')

const {
  foodMock,
  foodServiceMock
} = require('../utils/mocks/foodMocks')

const testServer = require('../utils/testServer')

describe('routes - api - food', function () {
  const route = proxyquire('../routes/foodRouter.js', {
    '../services/food.js': foodServiceMock
  })

  const request = testServer(route)

  describe('GET /food', function () {
    it('should respond with status 200', function (done) {
      request.get('/food').expect(200, done)
    })
  })
})
