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
    const user = req.body;
    User.create(user)
    .then((newuser) =>{
        res.json(newuser)
    }).catch((error)=>{
        console.log(error);
        res.status(500).send('Erreur');

    });
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
