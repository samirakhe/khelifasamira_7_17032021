const { selectFields } = require("express-validator/src/select-fields");
const { Sequelize, Models, DataTypes } = require("sequelize");
const { databaseVersion } = require("./db");
const db = require("./db");

const Likes = db.define(
    "Likes",
    {
        Likeid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
        },
    },
    {
        indexes: [{ unique: true, fields: ["Userid", "Postid"] }],
    }
);

module.exports = Likes;
