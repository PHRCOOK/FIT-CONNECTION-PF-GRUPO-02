const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // Este modelo recibe una instancia de "sequelize" para ejecutar el   ".define" y crear del Modelo.
  sequelize.define(
    "Gym",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      nit: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      map: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
