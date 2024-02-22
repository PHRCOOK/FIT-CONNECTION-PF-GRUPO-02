const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "FeedBack",
    {
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
      post_at: {
        // DATEONLY registra solo la fecha de creación sin la hora.
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
