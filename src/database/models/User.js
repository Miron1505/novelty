'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación con la tabla Roles
      User.belongsTo(models.Role, { as: 'fk_role_user', foreignKey: 'roleType', allowNull: false });
    }
  }
  User.init({
    userId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    profileImgUrl: DataTypes.STRING(100),
    username: { type: DataTypes.STRING(30), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    phone: { type: DataTypes.CHAR(12), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(100), allowNull: false },
    birthday: DataTypes.DATE,
    fullName: DataTypes.STRING(100),
    address: { type: DataTypes.STRING(100), allowNull: false, unique: true }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Usuarios'
  });
  return User;
};