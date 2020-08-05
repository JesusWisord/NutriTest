const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('nutriente', {
    // The following specification of the 'id' attribute could be omitted
    // since it is the default.
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre: {
      allowNull: false,
      type: DataTypes.STRING
    },
    id_usda: {
      allowNull: true,
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_modificacion'
  },
  {
    tableName: 'nutriente'
  })
}
