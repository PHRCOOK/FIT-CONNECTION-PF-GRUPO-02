const {DataTypes} = require("sequelize")

module.exports = (sequelize) => { 
  sequelize.define("ProductServies",{
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: { // Atributo que usamos para desactivar/eliminar el producto de ser necesario.
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      code: { 
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      image_url: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      stock: { 
        type: DataTypes.FLOAT,
        allowNull: false,
      },  
    },
    {timestamps: false},
  );
};