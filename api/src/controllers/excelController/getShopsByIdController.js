const { Datos } = require('../../db');

const getShopsByIdController = async (shopsId) => {
    try {
        const shops = await Datos.findByPk(shopsId);
        return shops;
    } catch (error) {
        throw new Error("Error al obtener usuario:" + error.message);
    }

};

module.exports = { getShopsByIdController }