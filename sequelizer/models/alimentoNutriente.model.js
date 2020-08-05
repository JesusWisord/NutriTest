const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('alimentoNutriente', {
    // The following specification of the 'id' attribute could be omitted
    // since it is the default.
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cantidad: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_modificacion'
  },
  {
    tableName: 'alimento_nutriente'
  })
}
