const { User } = require("../db");

const postUserController = async (Legajo, Email, Nombre, Apellido) => {
    const user = await User.create({ Legajo, Email, Nombre, Apellido });
    return user.dataValues;

};

module.exports = { postUserController };