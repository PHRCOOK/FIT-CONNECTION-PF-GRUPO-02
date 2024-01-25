const {DataTypes} = require("sequelize")

module.exports = (database) => { 
  database.define("Purchases",{
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payment_date: { // Con DATE registra fecha y hora.
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: { 
        type: DataTypes.STRING,
      },
    },
    {timestamps: false},
  );
};