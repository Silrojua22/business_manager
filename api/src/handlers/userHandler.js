const {
    postUserController,
    getUserController,
    assignFileNumberController,
    getUserByPkConreoller
} = require('../controllers/userController/userController.js')


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

const getAllUserHandler = async (req, res) => {
    try {
        const allUser = await getUserController();
        res.status(200).json(allUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const assignFileNumberHandler = async (req, res) => {
    try {
        await assignFileNumberController(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en la asignación de usuarios.' });
    }
}


const getUserByPkHanlder = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await getUserByPkConreoller(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = {
    postUserHandlder,
    getAllUserHandler,
    assignFileNumberHandler,
    getUserByPkHanlder
};