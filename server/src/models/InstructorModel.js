const {DataTypes} = require("sequelize")

module.exports = (database) => { 
  database.define("Instrutor",{
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: { // Atributo que usamos para desactivar/eliminar un instructor de ser necesario.
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {timestamps: false},
  );
};