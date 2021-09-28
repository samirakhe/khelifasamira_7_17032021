const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        Userid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique : true,

        },
        pseudo: {
            type: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            allowNull : false,
            unique: true,
        }

    
    });
    return User;
};