const express = require('express')
const passport = require('passport')
const { models } = require('../../sequelizer')

const validation = require('../utils/middlewares/validationHandler')
require('../utils/auth/strategies/jwt')

function unidadApi (app) {
  const router = express.Router()
  app.use('/unidad', router)
  router.get('/', async (req, res, next) => {
    try {
      const unidadList = await models.unidadNutriente.findAll()
      res.status(200).json({
        data: unidadList,
        message: 'Lista de unidades'
      })
    } catch (error) {
      next(error)
    }
  })
  router.get('/:uniId', async (req, res, next) => {
    const { uniId } = req.params
    try {
      const unidadItem = await models.unidadNutriente.findByPk(uniId)
      res.status(200).json({
        data: unidadItem,
        message: 'Unidad por Id'
      })
    } catch (error) {
      next(error)
    }
  })

  router.post('/', async (req, res, next) => {
    const { body: unidad } = req
    try {
      if (Array.isArray(unidad)) {
        const unidadItems = await models.unidadNutriente.bulkCreate(unidad)
        res.status(201).json({
          data: unidadItems,
          message: 'Unidades creadas'
        })
      } else {
        const unidadItem = await models.unidadNutriente.create(unidad)
        res.status(201).json({
          data: unidadItem,
          message: 'Unidad creada'
        })
      }
    } catch (error) {
      next(error)
    }
  })

  router.put('/:uniId', async (req, res, next) => {
    const { uniId } = req.params
    const { body: unidad } = req
    try {
      const unidadItem = await models.unidadNutriente.update(unidad, {
        where: {
          id: uniId
        }
      })
      res.status(200).json({
        data: unidadItem,
        message: 'Unidad actualizada'
      })
    } catch (error) {
      next(error)
    }
  })

  router.delete('/:uniId', async (req, res, next) => {
    const { uniId } = req.params
    try {
      const unidadItem = await models.unidadNutriente.destroy({
        where: {
          id: uniId
        }
      })
      res.status(200).json({
        data: unidadItem,
        message: 'Unidad eliminada'
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = unidadApi
