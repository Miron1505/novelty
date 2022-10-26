const { Category } = require('../database/db');

const addCategory = async (req, res) => {

    const { categoryName } = req.body;

    try {

        const newCategory = await Category.create({
            categoryName
        });

        res.status(201).json({newCategory});

    } catch (error) {
        res.status(404).json({error});
    }

}

const deleteCategory = async (req, res) => {
    
    const { categoryId } = req.params;

    try {
        await Category.destroy({
            where: {categoryId}
        });
        res.status(200).json(`La categoria con el id ${categoryId}, ha sido eliminado de la BD exitosamente.`);
    } catch (error) {
        res.status(404).json({error});
    }
    
}

const getCategoryById = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const gotCategory = await Category.findOne({
            where: {categoryId}
        });
        res.status(200).json(gotCategory);
    } catch (error) {
        res.status(404).json({error});
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json({error});
    }
}

module.exports = {
    addCategory,
    deleteCategory,
    getCategoryById,
    getAllCategories
}