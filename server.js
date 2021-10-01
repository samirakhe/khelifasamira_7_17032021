const http = require("http");
const app = require("./app");
const mysql = require("mysql2");
const db =  require('./backend/models/init');
const sequelize = require("./backend/models");
const User = require("./backend/models/user");
const Role = require("./backend/models/roles");
const Post = require("./backend/models/posts");
const Like = require("./backend/models/likes");
const Commentaire = require("./backend/models/commentaires");
const Sequelize = require("sequelize");
const ctrlUser = require('./backend/controllers/users');
const ctrlPosts = require('./backend/controllers/posts');
const ctrlComm = require('./backend/controllers/commentaires');


//ctrlUser.modifyUsers();


Post.belongsTo(User, { foreignKey : 'Userid'});
//User.hasMany(Post, { as: 'Posts'});
db.sync();
ctrlUser.createUsers();
ctrlUser.getAllusers();
ctrlUser.modifyUsers();
ctrlUser.deleteUsers();
ctrlPosts.createPosts();
ctrlPosts.modifyPosts();
ctrlPosts.getAllposts();
ctrlPosts.deletePosts();
ctrlComm.createComm();
ctrlComm.modifyComm();
ctrlComm.getAllCom();
ctrlComm.deleteComm();


app.set("port", 3000);
const server = http.createServer(app);
server.listen(3000, (req, res) => {
    console.log("URL server : http://localhost:" + 3000);
});
