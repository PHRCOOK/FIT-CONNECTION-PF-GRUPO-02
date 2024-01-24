const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('client_info', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            //defaultValue: UUIDV4
          },
          address:{
            type: DataTypes.STRING,
            allowNull:false
          },
          phone:{
            type: DataTypes.BOOLEAN,
            allowNull:false
          },
          dni:{
            type: DataTypes.BOOLEAN,
            allowNull:false
          },
    }, { timestamps: false });
}