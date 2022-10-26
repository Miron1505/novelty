const app = require('./app');
const { connection } = require('./database/db');
const { createRoles, createCategories, createClassifications } = require('./libs/initialData');

// Función main (mantiene ejecutando el programa)
function main() {

    // Puerto en el que se mantiene escuchando las peticiones el servidor
    const port = process.env.PORT || 5000
    
    app.listen(port, async () => {
        console.log(`Server listening on port ${port}`);
        try {
            // await connection.sync({force: false}) // Se trata de conectar a la bd, [force: true] elimina y vuelve a crear las tablas
            await createRoles(); // Se crean los roles en la BD si no existen.
            await createCategories(); // Se crean las categorias en la BD si no existen.
            await createClassifications(); // Se crean las clasificaciones en la BD si no existen.
            console.log('DB is connected');
        } catch (err) {
            console.error('No se pudo conectar a la bd', err);
        }
    });
}

// Se ejecuta la función main si no hay errores
try {
    main()
} catch (error) {
    console.error(error)
}