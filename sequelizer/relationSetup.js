function relationSetup (sequelize) {
  const {
    alimento,
    alimentoNutriente,
    categoriaNutriente,
    nutriente,
    unidadNutriente
  } = sequelize.models
  alimento.belongsToMany(nutriente, { through: alimentoNutriente })
  nutriente.belongsToMany(alimento, { through: alimentoNutriente })
  alimento.hasMany(alimentoNutriente)
  alimentoNutriente.belongsTo(alimento)
  nutriente.hasMany(alimentoNutriente)
  alimentoNutriente.belongsTo(nutriente)
  unidadNutriente.hasMany(nutriente)
  nutriente.belongsTo(unidadNutriente)
  categoriaNutriente.hasMany(nutriente)
  nutriente.belongsTo(categoriaNutriente)
}

module.exports = { relationSetup }
