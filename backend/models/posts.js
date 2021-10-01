const { Sequelize, Models, DataTypes } = require("sequelize");
const db = require('./init');
const User = require('./user');



const Post = db.define("Post", {
    Postid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    texte: {
        type: DataTypes.STRING,
        image: DataTypes.BLOB,
        createdAt: DataTypes.DATE,
    },
});

//Post.belongsTo(User, {foreignKey: 'userId'});
//Post.sync();
module.exports = Post;