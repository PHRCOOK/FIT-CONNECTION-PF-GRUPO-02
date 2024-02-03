const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // Este modelo recibe una instancia de "sequelize" para ejecutar el   ".define" y crear del Modelo.
  sequelize.define(
    "ClientInfo",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dni: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birth_date: {
        // Solo registra Año-Mes-Día.
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};