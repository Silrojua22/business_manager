const { postUserController } = require('../controllers/userController.js')


const postUserHandlder = async (req, res) => {
    try {
        const { Legajo, Email, Nombre, Apellido } = req.body;
        const user = await postUserController(Legajo, Email, Nombre, Apellido);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Hubo un problema al crear el usuario' });
    }
};

module.exports = { postUserHandlder };