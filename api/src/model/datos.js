const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    sequelize.define("Datos", {
        Cuit: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        Numero_de_Comercio: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        Nombre_Comercio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Nombre_Titular: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Cod_Postal_Legal: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Teléfono: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Calle_Comercio: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Número: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Nombre_Legal: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        EMAIL: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Gestionado: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "No gestionado",
        },

    },
        { timestamps: false }
    );
};
