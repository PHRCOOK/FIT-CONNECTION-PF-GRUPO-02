const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('feedback', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
          },
          comment:{
            type: DataTypes.STRING,
            allowNull:false
          },
          rating:{
            type: DataTypes.INTEGER,
            allowNull:false
          },
          post_at:{
            type: DataTypes.DATE,
            allowNull:false
          },
    }, { timestamps: false });
}