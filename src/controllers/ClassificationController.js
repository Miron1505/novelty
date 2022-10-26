const { Classification } = require('../database/db');

const addClassification = async (req, res) => {

    const { className, categoryId } = req.body;

    try {

        const newClass = await Classification.create({
            className,
            categoryId
        });

        res.status(201).json({newClass});

    } catch (error) {
        res.status(404).json({error});
    }

}

const deleteClassification = async (req, res) => {
    
    const { classId } = req.params;

    try {
        await Classification.destroy({
            where: {classId}
        });
        res.status(200).json(`La clasificación con el id ${classId}, ha sido eliminado de la BD exitosamente.`);
    } catch (error) {
        res.status(404).json({error});
    }
    
}

const getAllClassifications = async (req, res) => {
    try {
        const classes = await Classification.findAll();
        res.status(200).json(classes);
    } catch (error) {
        res.status(404).json({error});
    }
}

module.exports = {
    addClassification,
    deleteClassification,
    getAllClassifications
}