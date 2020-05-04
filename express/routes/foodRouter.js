const express = require('express')
const passport = require('passport')
const FoodService = require('../services/food')

const validation = require('../utils/middlewares/validationHandler')
const { foodIdSchema, createFoodSchema, updateFoodSchema } = require('../utils/schemas/food');
require('../utils/auth/strategies/jwt')

const foodService = new FoodService()

function foodApi (app) {
  const router = express.Router()
  app.use('/food', router)
  router.get('/', async (req, res, next) => {
    const { tags } = req.query
    try {
      const foodList = await foodService.getFoodList({ tags })
      res.status(200).json({
        data: foodList,
        message: 'Lista de alimentos'
      })
    } catch (error) {
      next(error)
    }
  })

  router.get('/:foodId', async (req, res, next) => {
    const { foodId } = req.params
    try {
      const foodItem = await foodService.getFood({ foodId })
      res.status(200).json({
        data: foodItem,
        message: 'Alimento por Id'
      })
    } catch (error) {
      next(error)
    }
  })

  router.post('/', validation(createFoodSchema), async (req, res, next) => {
    const { body: food } = req
    try {
      const foodItem = await foodService.getFood({ food })
      res.status(200).json({
        data: foodItem,
        message: 'Alimento creado'
      })
    } catch (error) {
      next(error)
    }
  })

  router.put('/:foodId',
    passport.authenticate('jwt', { session: false }),
    validation(foodIdSchema, 'params'),
    validation(updateFoodSchema),
    async (req, res, next) => {
      const { foodId } = req.params
      const { body: food } = req
      try {
        const foodItem = await foodService.updateFood({ foodId, food })
        res.status(200).json({
          data: foodItem,
          message: 'Alimento actualizado'
        })
      } catch (error) {
        next(error)
      }
    })

  router.delete('/:foodId', async (req, res, next) => {
    const { foodId } = req.params
    try {
      const foodItem = await foodService.updateFood({ foodId })
      res.status(200).json({
        data: foodItem,
        message: 'Alimento eliminado'
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = foodApi
