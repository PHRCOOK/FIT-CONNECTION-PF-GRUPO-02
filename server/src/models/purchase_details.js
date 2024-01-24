const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('purchase_detail', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
          },
          product_id:{
            type: DataTypes.INTEGER,
            allowNull:false
          },
          quantity:{
            type: DataTypes.FLOAT,
            allowNull:false
          },
    }, { timestamps: false });
}