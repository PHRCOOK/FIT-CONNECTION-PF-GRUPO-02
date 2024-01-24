const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
          },
          fullname:{
            type: DataTypes.STRING,
            allowNull:false
          },
          email:{
            type: DataTypes.STRING,
            allowNull:false
          },
          password:{
            type: DataTypes.STRING,
            allowNull:false
          },
          status:{
            type: DataTypes.BOOLEAN,
            allowNull:false
          },
          is_admin:{
            type: DataTypes.BOOLEAN,
            allowNull:false
          },
    }, { timestamps: false });
}