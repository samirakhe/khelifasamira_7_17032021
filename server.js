const http = require("http");
const app = require("./app");
const express = require("express");
const mysql = require("mysql2");
const  sequelize  = require("./models");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "minouu",
    database: "groupomania_p7",
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.set("port", 3000);
const server = http.createServer(app);
server.listen(3000, (req, res) => {
    console.log("URL server : http://localhost:" + 3000);
});
