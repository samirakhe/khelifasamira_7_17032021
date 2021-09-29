const http = require("http");
const app = require("./app");
const mysql = require("mysql2");
const  sequelize  = require("./models");
const User = require('./models/user');
const Sequelize  = require("sequelize");


const db = new Sequelize("groupomania_p7", "root", "minouu", {
    host: "localhost",
    dialect: "mysql",
});

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "minouu",
//     database: "groupomania_p7",
// });

// db.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });


app.set("port", 3000);
const server = http.createServer(app);
server.listen(3000, (req, res) => {
    console.log("URL server : http://localhost:" + 3000);
});
