const assert = require('assert')
const proxyquire = require('proxyquire')

const {
  foodMock,
  foodServiceMock
} = require('../express/utils/mocks/foodMocks')

const testServer = require('../express/utils/testServer')

describe('routes - api - food', function () {
  const route = proxyquire('../express/routes/foodRouter.js', {
    '../services/food.js': foodServiceMock
  })

  const request = testServer(route)

  describe('GET /food', function () {
    it('should respond with status 200', function (done) {
      request.get('/food').expect(200, done)
    })
  })
})
