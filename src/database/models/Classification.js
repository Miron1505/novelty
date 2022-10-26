'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación con la tabla Categorias
      Classification.belongsTo(models.Category, { as: 'fk_category_classification', foreignKey: 'categoryId' });
    }
  }
  Classification.init({
    classId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    className: DataTypes.STRING(30)
  }, {
    sequelize,
    modelName: 'Classification',
    tableName: 'Clasificaciones'
  });
  return Classification;
};