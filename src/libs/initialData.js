const { Role, Category, Classification } = require('../database/db');

const createRoles = async () => {
    try {
        const roles = await Role.count(); // Cuenta en número de roles dentro de la BD

        // Si ya exiten roles que no haga nada
        if (roles > 0) return;

        // Si no exiten roles, que los agregue en la BD
        Promise.all([
            await Role.create({rol: 'ADM'}),
            await Role.create({rol: 'EMP'}),
            await Role.create({rol: 'CLI'})
        ]);
    } catch (error) {
        console.error(error);
    }
}

const createCategories = async () => {
    try {
        const categories = await Category.count(); // Cuenta en número de categorias dentro de la BD

        // Si ya exiten categorias que no haga nada
        if (categories > 0) return;

        // Si no exiten categorias, que las agregue en la BD
        Promise.all([
            await Category.create({categoryName: 'Comida'}),
            await Category.create({categoryName: 'Salud y Belleza'}),
            await Category.create({categoryName: 'Accesorios'}),
            await Category.create({categoryName: 'Ropa'}),
            await Category.create({categoryName: 'Hogar'}),
            await Category.create({categoryName: 'Mascotas'})
        ]);
    } catch (error) {
        console.error(error);
    }
}

const createClassifications = async () => {
    try {
        const classifications = await Classification.count();

        if (classifications > 0) return;

        // Agrega clasificaciones a la categoria Comida
        Promise.all([
            await Classification.create({className: 'Bebidas', categoryId: 1}),
            await Classification.create({className: 'Tipicos', categoryId: 1}),
            await Classification.create({className: 'Postres', categoryId: 1}),
        ]);

        // Agrega clasificaciones a la categoria Salud y Belleza
        Promise.all([
            await Classification.create({className: 'Shampoos', categoryId: 2}),
            await Classification.create({className: 'Jabónes', categoryId: 2}),
            await Classification.create({className: 'Cosméticos', categoryId: 2}),
        ]);

         // Agrega clasificaciones a la categoria Accesorios
        Promise.all([
            await Classification.create({className: 'Cellphone Case', categoryId: 3}),
            await Classification.create({className: 'Collares', categoryId: 3}),
            await Classification.create({className: 'Pulseras', categoryId: 3}),
        ]);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    createRoles,
    createCategories,
    createClassifications
};