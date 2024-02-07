const {DataTypes} = require("sequelize")

module.exports = (database) => { 
  database.define("PurchaseDetail",{
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {timestamps: false},
  );
};