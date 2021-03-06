const Like = require('./likes');
const User = require('./user');
const Post =  require('./posts');
const Role = require('./roles');
const Commentaire =  require('./commentaires');
const db = require('./db');


//relation like
Like.belongsTo(User, { foreignKey : {name: 'Userid', allowNull: false}, as: 'user',onDelete: 'CASCADE'});
Like.belongsTo(Post, { foreignKey : {name: 'Postid', allowNull: false}, as: 'post',onDelete: 'CASCADE'});
Post.hasMany (Like, { foreignKey : 'Postid', as: 'likes'});

//relation role / Creation de la table de jointure 
Role.belongsToMany ( User, { through: 'User_Role', foreignKey: 'Roleid'});
User.belongsToMany ( Role, { through: 'User_Role', foreignKey: 'Userid', as: 'roles' });

//relation post
Post.belongsTo (User, { foreignKey : {name: 'Userid', allowNull: false}, as: 'user',onDelete: 'CASCADE'});
User.hasMany(Post, { foreignKey : 'Userid', as: 'posts'});

//relation commentaire
Commentaire.belongsTo (User, { foreignKey : {name: 'Userid', allowNull: false}, as: 'user',onDelete: 'CASCADE'});
Commentaire.belongsTo (Post, { foreignKey : {name: 'Postid', allowNull: false}, as: 'post',onDelete: 'CASCADE'});
User.hasMany(Commentaire, { foreignKey : 'Userid', as: 'commentaires'});
Post.hasMany(Commentaire, { foreignKey : 'Postid', as: 'commentaires'});

module.exports = db;