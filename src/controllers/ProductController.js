const { Product } = require('../database/db');


const createProduct = async (req, res) => {
    try {
        const { imageUrl, name, description, price, state, businessId, classId } = req.body;

        const newProduct = await Product.create({
            imageUrl,
            name,
            description,
            price,
            state,
            businessId,
            classId
        });

        res.status(201).json({newProduct});

    } catch (error) {
        res.status(404).json({error});
    }
}

const editProduct = async (req, res) => {

    const { productId } = req.params;
    const { imageUrl, name, description, price, state } = req.body;

    try {

        // Actualiza los datos del negocio, en caso un valor sea null utiliza los datos que ya estaban
        const affectedRows = await Product.update({
            imageUrl,
            name,
            description,
            price,
            state
        }, {
            where: {productId}
        });

        // Trae de la BD los datos del negocio actualizado mediante su id
        const updatedProduct = await Product.findOne({
            where: {productId},
            attributes: ["imageUrl", "description", "price", "state"]
        });

        res.status(200).json({affectedRows, updatedProduct});
    } catch (error) {
        res.status(304).json({error});
    }


}

const deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        await Product.destroy({
            where: {productId}
        });
        res.status(200).json(`El producto con el id ${productId}, ha sido eliminado de la BD exitosamente.`);
    } catch (error) {
        res.status(404).json({error});
    }
}

const getProductByID = async (req, res) => {
    const { productId } = req.params;

    try {
        const gotProduct = await Product.findOne({
            where: {productId}
        });
        res.status(200).json(gotProduct);
    } catch (error) {
        res.status(404).json({error});
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({error});
    }
}

const getAllProductsByBusinessId = async (req, res) => {

    const { businessId } = req.params;

    try {
        const products = await Product.findAll({
            where: {businessId}
        });
        
        if (products) res.status(200).json(products);
        else res.status(404).json({message: 'No hay productos'});

    } catch (error) {
        res.status(404).json({error});
    }
}

module.exports = {
    createProduct,
    editProduct,
    deleteProduct,
    getProductByID,
    getAllProducts,
    getAllProductsByBusinessId
}