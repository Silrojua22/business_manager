const { Datos } = require('../../db')

const getAllShopsController = async () => {
    try {
        const allComercios = await Datos.findAll();
        console.log(allComercios);
        return allComercios;

    } catch (error) {
        throw new Error("Error al objetener comercios" + error.message)
    }
}


module.exports = { getAllShopsController };