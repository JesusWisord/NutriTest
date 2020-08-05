const Joi = require('@hapi/joi')

const foodIdSchema = Joi.object({
  foodId: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
})

const createFoodSchema = Joi.object({
  name: Joi.string()
    .max(50)
    .required(),
  calorias: Joi.number()
    .min(1)
    .max(1000000),
  proteinas: Joi.number()
    .min(1)
    .max(1000000)
})

const updateFoodSchema = Joi.object({
  name: Joi.string()
    .max(50),
  calorias: Joi.number()
    .min(1)
    .max(1000000),
  proteinas: Joi.number()
    .min(1)
    .max(1000000),
  image: Joi.string()
})

module.exports = {
  foodIdSchema,
  createFoodSchema,
  updateFoodSchema
}
