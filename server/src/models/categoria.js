const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('categoria', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
          },
          name:{
            type: DataTypes.STRING,
            allowNull:false
          },
          status:{
            type: DataTypes.BOOLEAN,
            allowNull:false
          },
          is_service:{
            type: DataTypes.BOOLEAN,
            allowNull:false
          },
    }, { timestamps: false });
}