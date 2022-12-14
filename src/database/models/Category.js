'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    categoryId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    categoryName: DataTypes.STRING(30)
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'Categorias'
  });
  return Category;
};