const { Datos } = require('../../db');

const managementController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Datos.findByPk(id);

        if (!data) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }

        data.Gestionado = "Gestionado";
        await data.save();

        return 'Estado actualizado a gestionado';
    } catch (error) {
        return 'Error al actualizar estado';
    }
}

module.exports = { managementController };
