const { Sequelize, Models, DataTypes } = require("sequelize");
const db = require('./db');

const Commentaire = db.define("Commentaire", {
    Commentaireid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    commentaire: {
        type: DataTypes.TEXT,
        allowNull : true,
    },
});

module.exports = Commentaire;