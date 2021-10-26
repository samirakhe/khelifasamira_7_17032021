require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user")


module.exports = (req, res, next) => {
    try {
        console.log( req.headers.authorization);
        if(!req.headers.authorization){
            return res
                .status(401)
                .json({ message: "Utilisateur non authentifié" });
        }
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_SECRET_KEY);
        const Userid = decodedToken.Userid;
        if (!Userid ) {
            return res
                .status(401)
                .json({ message: "Utilisateur non authentifié" });
        } else {
            User.findByPk(Userid, {include:['roles']})
            .then((user)=>{
                req.user = user;
                next();
            })
           
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};


