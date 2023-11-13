const {
    postUserController,
    getUserController,
    assignFileNumberController,
    getUserByPkConreoller,
    getUserByLegajoController,
} = require('../controllers/userController/userController.js')


const postUserHandlder = async (req, res) => {
    try {
        const { legajo, email, nombre, apellido } = req.body;

        // Verificar si ya existe un usuario con el mismo Legajo
        const existingUser = await getUserByLegajoController(legajo);

        if (existingUser) {
            return res.status(400).json({ error: `El usuario con Legajo ${legajo} ya existe` });
        }

        // Si no existe, procede con la creación del usuario
        const user = await postUserController({ legajo, email, nombre, apellido });
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

const getUserByLegajoHandler = async (req, res) => {
    try {
        const { userLegajo } = req.params;

        // Verificar que userLegajo sea un número válido
        const legajo = parseInt(userLegajo, 10); // Intenta convertir a un número entero

        if (isNaN(legajo)) {
            res.status(400).json({ message: "El legajo no es un número válido" });
            return; // Sale de la función si no es un número válido
        }

        const user = await getUserByLegajoController(legajo);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Colaborador no encontrado" });
        }
    } catch (error) {
        console.error("Error al buscar usuario por legajo:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};



module.exports = {
    postUserHandlder,
    getAllUserHandler,
    assignFileNumberHandler,
    getUserByPkHanlder,
    getUserByLegajoHandler
};