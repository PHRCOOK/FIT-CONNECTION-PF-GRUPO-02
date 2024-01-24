const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('shopping_cart', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
          },
          quantity:{
            type: DataTypes.FLOAT,
            allowNull:false
          },
    }, { timestamps: false });
}