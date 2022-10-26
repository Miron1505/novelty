'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Business extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Business.belongsTo(models.User, { as: 'fk_user_business', foreignKey: 'userId', allowNull: false }); // Relación con la tabla Usuarios
      Business.belongsTo(models.Category, { as: 'fk_category_business', foreignKey: 'categoryId', allowNull: false }); // Relación con la tabla Categorias
    }
  }
  Business.init({
    businessId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    logo: DataTypes.STRING(100),
    businessName: DataTypes.STRING(50)
  }, {
    sequelize,
    modelName: 'Business',
    tableName: 'Negocios'
  });
  return Business;
};