const { Sequelize, Models, DataTypes } = require("sequelize");
const db = require("./db");

const Role = db.define("Role", {
    Roleid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nameRole: {
        type: DataTypes.ENUM("ADMIN", "EMPLOYE"),
        allowNull: false,
    },
});

module.exports = Role;
