const express = require('express')
const passport = require('passport')
const { models } = require('../../sequelizer')

const validation = require('../utils/middlewares/validationHandler')
const categoriaNutrienteModel = require('../../sequelizer/models/categoriaNutriente.model')
require('../utils/auth/strategies/jwt')

function nutrienteApi (app) {
  const router = express.Router()
  app.use('/nutriente', router)
  router.get('/', async (req, res, next) => {
    try {
      const nutrientList = await models.nutriente.findAll({
        attributes: {
          exclude: ['fecha_creacion', 'fecha_modificacion', 'unidadNutrienteId', 'categoriaNutrienteId']
        },
        include: [
          {
            model: models.categoriaNutriente,
            attributes: ['nombre']
          },
          {
            model: models.unidadNutriente,
            attributes: ['unidad', 'unidad_abrev']
          }
        ]
      })
      res.status(200).json({
        data: nutrientList,
        message: 'Lista de nutrientes'
      })
    } catch (error) {
      next(error)
    }
  })
  router.get('/:nutId', async (req, res, next) => {
    const { nutId } = req.params
    try {
      const nutrientItem = await models.nutriente.findByPk(nutId, {
        attributes: {
          exclude: ['fecha_creacion', 'fecha_modificacion', 'unidadNutrienteId', 'categoriaNutrienteId']
        },
        include: [
          {
            model: models.categoriaNutriente,
            attributes: ['nombre']
          },
          {
            model: models.unidadNutriente,
            attributes: ['unidad', 'unidad_abrev']
          }
        ]
      })
      res.status(200).json({
        data: nutrientItem,
        message: 'Nutriente por Id'
      })
    } catch (error) {
      next(error)
    }
  })

  router.post('/', async (req, res, next) => {
    const { body: nutrient } = req
    try {
      if (Array.isArray(nutrient)) {
        const nutrientItems = await models.nutriente.bulkCreate(nutrient)
        res.status(201).json({
          data: nutrientItems,
          message: 'Nutrientes creados'
        })
      } else {
        const nutrientItem = await models.nutriente.create(nutrient)
        res.status(201).json({
          data: nutrientItem,
          message: 'Nutriente creado'
        })
      }
    } catch (error) {
      next(error)
    }
  })

  router.put('/:nutId', async (req, res, next) => {
    const { nutId } = req.params
    const { body: nutrient } = req
    try {
      const nutrientItem = await models.nutriente.update(nutrient, {
        where: {
          id: nutId
        }
      })
      res.status(200).json({
        data: nutrientItem,
        message: 'Nutriente actualizado'
      })
    } catch (error) {
      next(error)
    }
  })

  router.delete('/:nutId', async (req, res, next) => {
    const { nutId } = req.params
    try {
      const nutrientItem = await models.nutriente.destroy({
        where: {
          id: nutId
        }
      })
      res.status(200).json({
        data: nutrientItem,
        message: 'Nutriente eliminado'
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = nutrienteApi
