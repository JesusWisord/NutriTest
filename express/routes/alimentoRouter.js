const express = require('express')
const passport = require('passport')
const { models } = require('../../sequelizer')

const validation = require('../utils/middlewares/validationHandler')
require('../utils/auth/strategies/jwt')

function foodApiv2 (app) {
  const fullReportOptions = {
    attributes: {
      exclude: ['fecha_creacion', 'fecha_modificacion']
    },
    include: [
      {
        model: models.alimentoNutriente,
        attributes: ['cantidad'],
        include: [
          {
            model: models.nutriente,
            attributes: ['nombre'],
            include: [
              {
                model: models.unidadNutriente,
                attributes: ['unidad', 'unidad_abrev']
              },
              {
                model: models.categoriaNutriente,
                attributes: ['nombre']
              }
            ]
          }
        ]
      }
    ]
  }
  const router = express.Router()
  app.use('/alimento', router)
  router.get('/', async (req, res, next) => {
    try {
      const foodList = await models.alimento.findAll(fullReportOptions)
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
      const foodItem = await models.alimento.findByPk(foodId, fullReportOptions)
      res.status(200).json({
        data: foodItem,
        message: 'Alimento por Id'
      })
    } catch (error) {
      next(error)
    }
  })

  router.post('/', async (req, res, next) => {
    const { body: food } = req
    try {
      const foodItem = await models.alimento.create(food)
      const nutrientes = food.nutrientes
      for (const index in nutrientes) {
        models.alimentoNutriente.create({
          alimentoId: foodItem.id,
          nutrienteId: nutrientes[index].id,
          cantidad: parseInt(nutrientes[index].cantidad)
        })
      }
      res.status(201).json({
        data: foodItem,
        message: 'Alimento creado'
      })
    } catch (error) {
      next(error)
    }
  })

  router.put('/:foodId', async (req, res, next) => {
    const { foodId } = req.params
    const { body: food } = req
    try {
      const foodItem = await models.alimento.update(food, {
        where: {
          id: foodId
        }
      })
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
      const foodItem = await models.alimento.destroy({
        where: {
          id: foodId
        }
      })
      res.status(200).json({
        data: foodItem,
        message: 'Alimento eliminado'
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = foodApiv2
