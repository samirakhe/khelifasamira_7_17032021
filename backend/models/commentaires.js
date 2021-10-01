const { Sequelize, Models, DataTypes } = require("sequelize");
const db = require('./init');

const Commentaire = db.define("Commentaire", {
    Commentaireid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    commentaire: {
        type: DataTypes.STRING,
        allowNull : true,
        createdAt: DataTypes.DATE,
    },
});
Commentaire.sync();
module.exports = Commentaire;