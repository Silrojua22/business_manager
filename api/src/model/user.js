const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("User", {
        Legajo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
        { timestamps: false },);
};
