const { Business } = require('../database/db');

const createBusiness = async (req, res) => {

    const { logo, businessName, userId, categoryId } = req.body;

    try {

        // Agrega el negocios a la BD
        const newBusiness = await Business.create({
            logo,
            businessName,
            userId,
            categoryId
        });

        res.status(201).json({newBusiness});

    } catch (error) {
        res.status(400).json({error});
    }

}

const editBusiness = async (req, res) => {
    const { businessId } = req.params; // Obtiene como parametro el id del negocio que se desea actualizar
    const { logo, businessName, businessDescription } = req.body; // Obtiene los datos nuevos

    try {

        // Actualiza los datos del negocio, en caso un valor sea null utiliza los datos que ya estaban
        const affectedRows = await Business.update({
            logo,
            businessName,
            businessDescription
        }, {
            where: {businessId}
        });

        // Trae de la BD los datos del negocio actualizado mediante su id
        const updatedBusiness = await Business.findOne({
            where: {businessId},
            attributes: ["logo", "businessName", "businessDescription"]
        });

        res.status(200).json({affectedRows, updatedBusiness});
    } catch (error) {
        res.status(304).json({error});
    }
}

const deleteBusiness = async (req, res) => {
    const { businessId } = req.params; // Obtiene como parametro el id del negocio que se desea eliminar

    try {
        await Business.destroy({
            where: {businessId}
        });
        res.status(200).json(`El negocio con el id ${businessId}, ha sido eliminado de la BD exitosamente.`);
    } catch (error) {
        res.status(404).json({error});
    }
}

const getBusinessById = async (req, res) => {
    const { businessId } = req.params; // Obtiene como parametro el id del negocio

    try {
        const gotBusiness = await Business.findOne({
            where: {businessId}
        });
        res.status(200).json(gotBusiness);
    } catch (error) {
        res.status(404).json({error});
    }
}

const getBusinessByUserId = async (req, res) => {
    const { userId } = req.params; // Obtiene como parametro el id del negocio

    try {
        const gotBusiness = await Business.findOne({
            where: {userId}
        });
        
        if (gotBusiness) res.status(200).json(gotBusiness);
        else res.status(404).json({message: 'No encontrado'});

    } catch (error) {
        res.status(404).json({error});
    }
}

const getBusinessByCategoryId = async (req, res) => {
    const { categoryId } = req.params; // Obtiene como parametro el id del negocio

    try {
        const gotBusiness = await Business.findOne({
            where: {categoryId}
        });
        
        if (gotBusiness) res.status(200).json(gotBusiness);
        else res.status(404).json({message: 'No encontrado'});

    } catch (error) {
        res.status(404).json({error});
    }
}

const getAllBusinesses = async (req, res) => {
    try {
        const businesses = await Business.findAll();
        res.status(200).json(businesses);
    } catch (error) {
        res.status(404).json({error});
    }
}

module.exports = {
    createBusiness,
    editBusiness,
    deleteBusiness,
    getBusinessById,
    getBusinessByUserId,
    getBusinessByCategoryId,
    getAllBusinesses
}