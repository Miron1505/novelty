const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config/config');

const database = {};

// Se crea la conexión a la dase de datos
database.connection = new Sequelize(config);

// Creacion de tablas en la BD
database.Role = require('./models/Role')(database.connection, DataTypes);
database.User = require('./models/User')(database.connection, DataTypes);
database.Category = require('./models/Category')(database.connection, DataTypes);
database.Classification = require('./models/Classification')(database.connection, DataTypes);
database.Business = require('./models/Business')(database.connection, DataTypes);
database.Product = require('./models/Product')(database.connection, DataTypes);

// Relaciones de las tablas en la BD
database.User.associate(database);
database.Classification.associate(database);
database.Business.associate(database);
database.Product.associate(database);

module.exports = database;