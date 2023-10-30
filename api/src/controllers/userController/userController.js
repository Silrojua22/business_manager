const { User, Datos } = require("../../db");

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
        const unassignedData = await Datos.findAll({ where: { UserId: null } });

        if (users.length === 0 || unassignedData.length === 0) {
            return res.status(404).json({ message: 'No users or data available for assignment.' });
        }

        const dataPerUser = Math.floor(unassignedData.length / users.length);

        let dataIndex = 0;

        for (const user of users) {
            const dataForUser = unassignedData.slice(dataIndex, dataIndex + dataPerUser);

            for (const data of dataForUser) {

                data.UserId = user.id;
                await data.save();
            }

            dataIndex += dataPerUser;
        }


        for (let i = dataIndex; i < unassignedData.length; i++) {
            unassignedData[i].UserId = users[i % users.length].id;
            await unassignedData[i].save();
        }

        return res.status(200).json({ message: 'User assignment completed.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error in user assignment.' });
    }
}




module.exports = {
    postUserController,
    getUserController,
    assignFileNumberController,
    getUserByPkConreoller,
};