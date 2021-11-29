require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
    try {
        console.log(req.headers.authorization);
        if (!req.headers.authorization) {
            return res
                .status(401)
                .json({ message: "Utilisateur non authentifié" });
        }
        // On récupère le token une fois les autorisations passées
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_SECRET_KEY);
        //on récupère l'id de l'user
        const Userid = decodedToken.Userid;
        if (!Userid) {
            return res
                .status(401)
                .json({ message: "Utilisateur non authentifié" });
        } else {
            // On récupère l'user à partir de l'id, on inclus les roles
            User.findByPk(Userid, { include: ["roles"] })
            .then((user) => {
                //on passe l'user à la requête
                req.user = user;
                next();
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};
