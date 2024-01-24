const {DataTypes} = require("sequelize")

module.exports = (sequelize) => { // Este modelo recibe una instancia de "sequelize" para ejecutar el   ".define" y crear del Modelo.
  sequelize.define("Gym",{
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
        allowNull: false,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      smtp_host: {
        type: DataTypes.STRING,
      },
      smtp_port: {
        type: DataTypes.INTEGER,
      },
      smtp_user: {
        type: DataTypes.STRING,
      },
      smtp_password: {
        type: DataTypes.STRING,
      },
      smtp_tis: {
        type: DataTypes.BOOLEAN,
      },
      smtp_ssl: {
        type: DataTypes.BOOLEAN,
      },
    },
    {timestamps: false},
  );
}