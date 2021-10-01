const { Sequelize, Models, DataTypes } = require("sequelize");
const db = require('./init');

const Role = db.define("Role", {
    Roleid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        createdAt: DataTypes.DATE,
    },
    nameRole : {
        type: DataTypes.STRING,
        unique: true,
        createdAt: DataTypes.DATE,
    }, 
});

module.exports = Role;