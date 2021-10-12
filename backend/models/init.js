const Like = require('./likes');
const User = require('./user');
const Post =  require('./posts');
const Role = require('./roles');
const Commentaire =  require('./commentaires');
const db = require('./db');
const Likes = require('./likes');
//const User_Role = require('./user_role');


//relation like
Like.belongsTo(User, { foreignKey : {name: 'Userid', allowNull: false}, as: 'user',onDelete: 'CASCADE'});
Like.belongsTo(Post, { foreignKey : {name: 'Postid', allowNull: false}, as: 'post',onDelete: 'CASCADE'});
Post.hasMany (Like, { foreignKey : 'Postid', as: 'likes'});

//Likes.associations = (models) =>{Likes.belongsTo(models.Post)};


//relation role
Role.belongsToMany ( User, { through: 'User_Role', foreignKey: 'Roleid'});
User.belongsToMany ( Role, { through: 'User_Role', foreignKey: 'Userid', as: 'roles' });





//relation post
Post.belongsTo (User, { foreignKey : {name: 'Userid', allowNull: false}, as: 'user',onDelete: 'CASCADE'});
User.hasMany(Post, { foreignKey : 'Userid', as: 'posts'});
//Post.associations = (models) =>{Post.belongsTo(models.User)}

//relation commentaire
Commentaire.belongsTo (User, { foreignKey : {name: 'Userid', allowNull: false}, as: 'user',onDelete: 'CASCADE'});
Commentaire.belongsTo (Post, { foreignKey : {name: 'Postid', allowNull: false}, as: 'post',onDelete: 'CASCADE'});
User.hasMany(Commentaire, { foreignKey : 'Userid', as: 'commentaires'});
Post.hasMany(Commentaire, { foreignKey : 'Postid', as: 'commentaires'});
// Commentaire.associations = (models) =>{ Commentaire.belongsTo(models.User)};
// Commentaire.associations = (models) =>{ Commentaire.belongsTo(models.Post)};



module.exports = db;