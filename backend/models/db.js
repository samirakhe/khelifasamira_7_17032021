const { Sequelize, Models, DataTypes } = require("sequelize");


const sequelize = new Sequelize("groupomania_p7", "root", "minouu", {
    host: "localhost",
    dialect: "mysql",
});


module.exports = sequelize;