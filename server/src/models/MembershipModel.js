const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Membership', {
        id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        },
        name: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        price: {
        type: DataTypes.FLOAT,
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