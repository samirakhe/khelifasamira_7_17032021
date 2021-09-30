const { Sequelize, Models, DataTypes } = require("sequelize");
const sequelize = new Sequelize("groupomania_p7", "root", "minouu", {
    host: "localhost",
    dialect: "mysql",
});

const Role = sequelize.define("Role", {
    Roleid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        createdAt: DataTypes.DATE,
    },
});
Role.sync();
module.exports = Role;