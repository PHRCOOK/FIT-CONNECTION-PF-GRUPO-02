const {DataTypes} = require("sequelize")

module.exports = (sequelize) => { 
  sequelize.define("feedback",{
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      raiting: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      post_at: { // DATE registra fecha completa con la hora.
        type: DataTypes.DATE,
        allowNull: false,
      },
    },        
    {timestamps: false},
  );
};