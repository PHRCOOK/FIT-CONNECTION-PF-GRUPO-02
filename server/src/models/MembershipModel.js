const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Membership', {
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
        start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        },
        expiration_date: {
        type: DataTypes.DATE,
        allowNull: false,
        },
        duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
        description: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        },
        image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    }, { timestamps: false });
    };