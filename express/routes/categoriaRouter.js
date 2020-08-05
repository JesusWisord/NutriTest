const express = require('express')
const passport = require('passport')
const { models } = require('../../sequelizer')

const validation = require('../utils/middlewares/validationHandler')
require('../utils/auth/strategies/jwt')

function categoriaApi (app) {
  const router = express.Router()
  app.use('/categoria', router)
  router.get('/', async (req, res, next) => {
    try {
      const categoriaList = await models.categoriaNutriente.findAll()
      res.status(200).json({
        data: categoriaList,
        message: 'Lista de categorías'
      })
    } catch (error) {
      next(error)
    }
  })
  router.get('/:catId', async (req, res, next) => {
    const { catId } = req.params
    try {
      const categoryItem = await models.categoriaNutriente.findByPk(catId)
      res.status(200).json({
        data: categoryItem,
        message: 'Categoría por Id'
      })
    } catch (error) {
      next(error)
    }
  })

  router.post('/', async (req, res, next) => {
    const { body: category } = req
    try {
      const categoryItem = await models.categoriaNutriente.create(category)
      res.status(201).json({
        data: categoryItem,
        message: 'Categoría creada'
      })
    } catch (error) {
      next(error)
    }
  })

  router.put('/:catId', async (req, res, next) => {
    const { catId } = req.params
    const { body: nutrient } = req
    try {
      const categoryItem = await models.categoriaNutriente.update(nutrient, {
        where: {
          id: catId
        }
      })
      res.status(200).json({
        data: categoryItem,
        message: 'Categoría actualizada'
      })
    } catch (error) {
      next(error)
    }
  })

  router.delete('/:catId', async (req, res, next) => {
    const { catId } = req.params
    try {
      const categoryItem = await models.categoriaNutriente.destroy({
        where: {
          id: catId
        }
      })
      res.status(200).json({
        data: categoryItem,
        message: 'Categoría eliminada'
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = categoriaApi
