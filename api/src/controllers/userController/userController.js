const { User, Datos } = require("../../db");

const postUserController = async ({ legajo, email, nombre, apellido }) => {
    const user = await User.create({
        Legajo: legajo,
        Email: email,
        Nombre: nombre,
        Apellido: apellido
    });
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

const getUserByPkConreoller = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        return user;
    } catch (error) {
        throw new Error("Error al obtener usuario:" + error.message);
    }

}

const assignFileNumberController = async (req, res) => {
    try {
        const users = await User.findAll();
        const unassignedData = await Datos.findAll({ where: { Legajo: null } }); // Filtra por Legajo en lugar de UserId

        if (users.length === 0 || unassignedData.length === 0) {
            return res.status(404).json({ message: 'No users or data available for assignment.' });
        }

        const dataPerUser = Math.floor(unassignedData.length / users.length);

        let dataIndex = 0;

        for (const user of users) {
            const dataForUser = unassignedData.slice(dataIndex, dataIndex + dataPerUser);

            for (const data of dataForUser) {
                data.Legajo = user.Legajo;
                await data.save();
            }

            dataIndex += dataPerUser;
        }

        for (let i = dataIndex; i < unassignedData.length; i++) {
            unassignedData[i].Legajo = users[i % users.length].Legajo;
            await unassignedData[i].save();
        }

        return res.status(200).json({ message: 'User assignment completed.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error in user assignment.' });
    }
};

const getUserByLegajoController = async (legajo) => {
    try {
        const user = await User.findOne({
            where: { Legajo: legajo },
            attributes: ["Legajo", "Email", "Nombre", "Apellido"]
        });

        return user;
    } catch (error) {
        throw error;
    }
};






module.exports = {
    postUserController,
    getUserController,
    assignFileNumberController,
    getUserByPkConreoller,
    getUserByLegajoController,
};