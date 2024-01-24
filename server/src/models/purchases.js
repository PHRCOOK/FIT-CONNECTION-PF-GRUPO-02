const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('purchases', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
          },
          payment_method:{
            type: DataTypes.STRING,
            allowNull:false
          },
          payment_date:{
            type: DataTypes.DATE,
            allowNull:false
          },
          status:{
            type: DataTypes.BOOLEAN,
            allowNull:false
          },
    }, { timestamps: false });
}