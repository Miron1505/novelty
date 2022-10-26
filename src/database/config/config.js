// Variables de entorno
require('dotenv').config();

// Configuración de la base de datos
module.exports = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT || 3306,
  define: {
    timestamps: false
    // undersocred: true // snake_case 
  }
}