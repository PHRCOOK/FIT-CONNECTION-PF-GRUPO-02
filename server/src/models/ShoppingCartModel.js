const {DataTypes} = require("sequelize")

module.exports = (database) => { 
  database.define("ShoppingCart",{
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {timestamps: false},
  );
};