const bcrypt = require("bcrypt");
const passwordValidator = require("password-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

exports.getAllusers = (req, res) => {
    User.findAll()
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.createUsers = (req, res) => {
    const user = {
        nom: "khelifa",
        prenom: "sam",
        email: "sam@gami.com",
        password: "ocr",
        pseudo: "sam",
    };
    User.create(user);
};

exports.modifyUsers = (req, res) => {
    // User.update({}, { where: { Userid : /*req.params.id*/} })
    //     .then((user) => {
    //         console.log('utilisateur modifé');
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
};

exports.deleteUsers = (req, res) => {
  
    // User.destroy ({ where: { Userid : /*req.params.id*/}})
    // .then(() =>
    //     res
    //         .status(200)
    //         .json({ message: "L'utilisateur est supprimé !" })
    // )
    // .catch((error) => res.status(400).json({ error }));
}
