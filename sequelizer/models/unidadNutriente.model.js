const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('unidadNutriente', {
    // The following specification of the 'id' attribute could be omitted
    // since it is the default.
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    unidad: {
      allowNull: false,
      type: DataTypes.STRING
    },
    unidad_abrev: {
      allowNull: false,
      type: DataTypes.STRING
    }
  },
  {
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_modificacion'
  },
  {
    tableName: 'unidad_nutriente'
  })
}
