const {DataTypes} = require("sequelize")

module.exports = (database) => { 
  database.define("shopping_cart",{
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