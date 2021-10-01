const { Sequelize, Models, DataTypes } = require("sequelize");
const Role = require('./roles');
//const Post = require('./posts');
const db = require('./init');


const User = db.define("User", {
    Userid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        createdAt: DataTypes.DATE,
    },
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        createdAt: DataTypes.DATE,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        createdAt: DataTypes.DATE,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        createdAt: DataTypes.DATE,
    },
    
});

module.exports = User;

