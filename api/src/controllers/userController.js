const { User } = require("../db");

const postUserController = async (Legajo, Email, Nombre, Apellido) => {
    const user = await User.create({ Legajo, Email, Nombre, Apellido });
    return user.dataValues;

};

const getUserController = async (req, res) => {
    try {
        const user = await User.findAll();
        return res.status(200).json(user)
    } catch (error) {
        throw new Error("Error al obtener  Usuarios" + error.message)
    }
}


module.exports = { postUserController, getUserController };