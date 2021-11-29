require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//Savoir si l'user qui fait la requete est l'admin
//pour les requetes destinées a l'admin, ce middleware s'execute après le midd auth
module.exports = (req, res, next) => {
    try {
        //user défini dans auth. On récupère les roles
        const user = req.user;
        const roles = user.roles;
        if (!roles) {
            return res.status(401).json("Action non autorisée");
        }
        // On vérifie s'il l'user a un role qui a pour nom ADMIN
        const adminRole = roles.find((role) => role.nameRole === "ADMIN");
        if (!adminRole) {
            return res.status(401).json("Action non autorisée");
        }
        // Next, si le role admin est trouvé, la requête se poursuit
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};
