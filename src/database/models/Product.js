'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Business, { as: 'fk_business_product', foreignKey: 'businessId' }) // Relación con la tabla Negocios
      Product.belongsTo(models.Classification, { as: 'fk_classification_product', foreignKey: 'classId' }) // Relación con la tabla Clasificaciones
    }
  }
  Product.init({
    productId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    imageUrl: DataTypes.STRING(100),
    name: DataTypes.STRING(30),
    description: DataTypes.TEXT,
    price: DataTypes.DOUBLE,
    state: DataTypes.CHAR(1) // [0] No disponible, [1] Disponible
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Productos'
  });
  return Product;
};