const bcrypt = require("bcrypt");
const passwordValidator = require("password-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Role = require("../models/roles");
require("dotenv").config();


exports.getAllposts = (req, res) => {
    Role.findAll({
        include: ['Roleid', 'Userid']//as de init
    })
        .then((role) => {
            res.json(role);
        })
        .catch((err) => {
            console.log(err)
            res.status(404).json('Role non trouvé')
        });
};