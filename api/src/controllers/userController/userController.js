const { User } = require("../../db");

const postUserController = async (Legajo, Email, Nombre, Apellido) => {
    const user = await User.create({ Legajo, Email, Nombre, Apellido });
    return user.dataValues;

};

const getUserController = async () => {
    try {
        const user = await User.findAll();
        return user;
    } catch (error) {
        throw new Error("Error al obtener usuarios: " + error.message);
    }
}



module.exports = { postUserController, getUserController };