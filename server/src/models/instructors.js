const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('instructors', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
          },
          fullname:{
            type: DataTypes.STRING,
            allowNull:false
          },
          photo_url:{
            type: DataTypes.STRING,
            allowNull:false
          },
          description:{
            type: DataTypes.STRING,
            allowNull:false
          },
          status:{
            type: DataTypes.BOOLEAN,
            allowNull:false
          },
    }, { timestamps: false });
}