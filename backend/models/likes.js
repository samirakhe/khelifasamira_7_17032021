const { Sequelize, Models, DataTypes } = require("sequelize");
const db = require('./init');

const Like = db.define("Like", {
    Likeid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    likes: {
        type: DataTypes.INTEGER,
    },
});
Like.sync();
module.exports = Like;