// Variables de entorno
require('dotenv').config();

// Configuración de la base de datos
module.exports = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: process.env.DB_DIALECT,
  define: {
    timestamps: false
    // undersocred: true // snake_case 
  }
}