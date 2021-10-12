require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
    try {
        const user = req.user;
        const roles = user.roles;
        if (!roles) {
            return res.status(401).json("Action non autorisée");
        }
        const adminRole = roles.find((role) => role.nameRole === "ADMIN");
        if(!adminRole){
            return res.status(401).json("Action non autorisée");
        }
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};
