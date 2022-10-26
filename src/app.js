const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const info = require('../package.json');

// Archivos del router
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const businessRoutes = require('./routes/business.routes');
const productRoutes = require('./routes/product.routes');

// Variables de entorno
require('dotenv').config();

// Inicialización de express
const app = express();

// Middlewares
app.use(cors()); // Permite enviar peticiones desde otro servidor
app.use(morgan('dev')); // Permite ver las peticiones que le llegan a la app
app.use(express.json()); // Lee los archivos json
app.use(express.urlencoded({ extended: false }));

// Rutas (Endpoints)

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        name: info.name,
        version: info.version,
        description: info.description,
        author: info.author
    });
});

app.use('/user', userRoutes); // Rutas de los usuarios
app.use('/auth', authRoutes); // Rutas de autentificación
app.use('/business', businessRoutes); // Rutas de los negocios
app.use('/product', productRoutes); // Rutas de los productos

module.exports = app;