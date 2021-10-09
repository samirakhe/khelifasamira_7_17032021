const { Sequelize, Models, DataTypes } = require("sequelize");
const db = require('./db');
const User = require('./user');



const Post = db.define("Post", {
    Postid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    texte: {
        type: DataTypes.STRING,
    },
    image: {
       type: DataTypes.BLOB,
    },

    
});


module.exports = Post;