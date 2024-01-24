const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('gym', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        //defaultValue: UUIDV4
      },
      name:{
        type: DataTypes.STRING,
        allowNull:false
      },
      address:{
        type: DataTypes.STRING,
        allowNull:false
      },
      phone:{
        type: DataTypes.STRING,
        allowNull:false
      },
      status:{
        type: DataTypes.BOOLEAN,
        allowNull:false
      },
      nit:{
        type: DataTypes.STRING,
        allowNull:false
      },
      logo:{
        type: DataTypes.STRING,
        allowNull:false
      },
      smtp_host:{
        type: DataTypes.STRING,
        allowNull:false
      },
      smtp_port:{
        type: DataTypes.INTEGER,
        allowNull:false
      },
      smtp_user:{
        type: DataTypes.STRING,
        allowNull:false
      },
      smtp_password:{
        type: DataTypes.STRING,
        allowNull:false
      },
      smtp_tls:{
        type: DataTypes.STRING,
        allowNull:false
      },
      smtp_ssl:{
        type: DataTypes.STRING,
        allowNull:false
      },
      
    }, { timestamps: false });
  };