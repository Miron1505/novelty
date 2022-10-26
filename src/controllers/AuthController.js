const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../database/db');

// Función para encriptar contraseñas de los usuarios
async function cryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// Comparar los hash del password
async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

const authUser = async (req, res) => {

    const {  username, password } = req.body;

    try {

        // Busca al usuario mediante el username en la BD
        await User.findOne({
            where: {username}
        }).then(async (result) => {

            if (result !== null && await comparePassword(password, result.password)) {

                // Se genera el token con los datos del usuario
                const token = jwt.sign({id: result.userId}, process.env.SECRET, {
                    expiresIn: 86400 // 24 horas
                });

                res.status(200).json({token});
            } else {
                res.status(401).json({message: "Nombre de usuario o contraseña incorrectos!"});
            }

        });

    } catch (error) {
        res.status(404).json({error})
    }
}

const createUser = async (req, res) => {
    const { profileImgUrl, username, email, phone, password, birthday, fullName, address, roleType } = req.body; // Datos del request
    const hashedPassword = await cryptPassword(password); // Encriptación de la contraseña del usuario

    try {
        
        // Creación del usuario en la BD
        const newUser = await User.create({
            profileImgUrl,
            username,
            email,
            phone,
            password: hashedPassword,
            birthday,
            fullName,
            address,
            roleType
        });

        // Se genera el token con los datos del usuario
        const token = jwt.sign({id: newUser.userId}, process.env.SECRET, {
            expiresIn: 86400 // 24 horas
        });

        res.status(201).json({token, newUser});

    } catch (error) {
        // El servidor responde con un error en caso de una falla
        res.status(404).json({error});
    }
}

const validateUser = async (req, res) => {

    // Headers de la request
    const token = req.headers['accesstoken'];

    try {
        if (token) {

            if (jwt.verify(token, process.env.SECRET)) {

                const data = jwt.decode(token);

                await User.findOne({
                    where: {userId: data.id},
                    attributes: ["userId", "profileImgUrl", "username", "email", "phone", "birthday", "fullName", "address", "roleType"]
                }).then((user) => {
                    res.status(200).json({user})
                }).catch(err => console.error(err));
            }
            
        } else {
            res.status(401).json({message: "No se ha enviado un token"});
        }
    } catch (error) {
        if (jwt.TokenExpiredError) {
            res.status(401).json({tokenExpired: true});
        } else {
            res.status(401).json({error});
        }
    }
}

module.exports = {
    authUser,
    createUser,
    validateUser
}