const { User } = require('../database/db');

const updateUser = async (req, res) => {
    const { id } = req.params; // Obtiene como parametro el id del usuario que se desea actualizar
    const { profileImgUrl, phone, email, address, password } = req.body; // Obtiene los datos nuevos

    try {

        // Actualiza los datos del usuario, en caso un valor sea null utiliza los datos que ya estaban
        const affectedRows = await User.update({
            profileImgUrl,
            phone,
            email,
            address,
            password
        }, {
            where: {userId: id}
        });

        // Trae de la BD los datos del usuario actualizado mediante su id
        const updatedUser = await User.findOne({
            where: {userId: id},
            attributes: ["phone", "email", "address", "password"]
        });

        res.status(200).json({affectedRows, updatedUser});
    } catch (error) {
        res.status(304).json({error});
    }
}

const deleteUser = async (req, res) => {
    const { userId } = req.params; // Obtiene como parametro el id del usuario que se desea eliminar

    try {
        await User.destroy({
            where: {userId}
        });
        res.status(200).json(`El usuario con el id ${userId}, ha sido eliminado de la BD exitosamente.`);
    } catch (error) {
        res.status(404).json({error});
    }
}

const getUserById = async (req, res) => {
    const { userId } = req.params; // Obtiene como parametro el id del usuario

    try {
        const gotUser = await User.findOne({
            where: {userId}
        });
        res.status(200).json(gotUser);
    } catch (error) {
        res.status(404).json({error});
    }
    
}

const getAll = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({error});
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getUserById,
    getAll
}