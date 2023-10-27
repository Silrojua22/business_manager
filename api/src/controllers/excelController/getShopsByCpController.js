const { Datos } = require('../../db');

const getShopsByCpController = async (req, res) => {
    try {
        const codigoPostal = req.params.codigoPostal;
        const comercios = await Datos.findAll({ where: { Cod_Postal_Legal: codigoPostal } });

        const status = comercios.length === 0 ? 404 : 200;
        const message = comercios.length === 0
            ? 'No se encontraron comercios con ese código postal.'
            : undefined;

        res.status(status).json({ message, comercios });
    } catch (error) {
        console.error('Error al buscar comercios por código postal:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { getShopsByCpController };