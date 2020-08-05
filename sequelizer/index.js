const { config } = require('../config')
const { Sequelize } = require('sequelize')
const { relationSetup } = require('./relationSetup')
const USER = config.post_user
const HOST = config.post_host
const DB_NAME = config.post_db_name
const PASS = config.post_password
const PORT = config.post_port
const DB_URI = `postgres://${USER}:${PASS}@${HOST}:${PORT}/${DB_NAME}`
const options = {
  logging: false,
  define: {
    underscored: true,
    charset: 'utf8',
    freezeTableName: false
  }
}
const sequelize = new Sequelize(DB_URI, options)

const modelDefiners = [
  require('./models/alimento.model'),
  require('./models/alimentoNutriente.model'),
  require('./models/categoriaNutriente.model'),
  require('./models/nutriente.model'),
  require('./models/unidadNutriente.model')
]

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize)
}

relationSetup(sequelize)
sequelize.sync({ alter: true })

module.exports = sequelize
