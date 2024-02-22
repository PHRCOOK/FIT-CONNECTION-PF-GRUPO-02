const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Message", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },

    message: {
      type: DataTypes.TEXT,
    },
    sender_type: { type: DataTypes.BOOLEAN, defaultValue: false },
  });
};
