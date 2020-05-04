const foodMock = [
  {
    name: 'banana',
    kcal: 15,
    prot: 10,
    tags: ['fruit']
  },
  {
    name: 'apple',
    kcal: 340,
    prot: 90,
    tags: ['fruit']
  },
  {
    name: 'lettuce',
    kcal: 140,
    prot: 60,
    tags: ['green']
  },
  {
    name: 'chicken',
    kcal: 300,
    prot: 2,
    tags: ['animal']
  }
]

function filteredFoodMock (tag) {
  return foodMock.filter(food => food.tags.includes(tag))
}

class foodServiceMock {
  async getFoodList () {
    return Promise.resolve(foodMock)
  }

  async createProduct () {
    return Promise.resolve('6bedb1267d1ca7f3053e2875')
  }
}

module.exports = {
  foodMock,
  filteredFoodMock,
  foodServiceMock
}
