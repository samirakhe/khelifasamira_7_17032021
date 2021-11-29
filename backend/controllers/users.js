require("dotenv").config();
const bcrypt = require("bcrypt");
const passwordValidator = require("password-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Role = require("../models/roles");
const Posts = require("../models/posts");
const Commentaires = require("../models/commentaires");

//Conditions password
const passwordSchema = new passwordValidator();
passwordSchema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

exports.createUsers = async (req, res, next) => {
    const data = { ...req.body };
    try {
        // On vérifie que l'adresse email n'existe pas dans la bdd
        let user = await User.findOne({ where: { email: data.email } });
        if (user) {
            return res
                .status(400)
                .json({ message: "Adresse email déjà utilisée" });
        }
        // On vérifie que le pseudo n'existe dans la bdd
        user = await User.findOne({ where: { pseudo: data.pseudo } });
        if (user) {
            return res
                .status(400)
                .json({ message: "Ce pseudo est déjà utilisée" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }

    if (passwordSchema.validate(data.password)) {
        bcrypt
            .hash(data.password, 10)
            .then((hash) => {
                data.password = hash;
                // Une fois les conditions sur mdp remplies, l'user peut être créé
                User.create({
                    email: data.email,
                    password: data.password,
                    pseudo: data.pseudo,
                })
                    .then((userCreated) => {
                        // Attribution du role EMPLOYE à tout nouvel user, admin étant deja enregistré dans la bdd
                        Role.findOne({ where: { nameRole: "EMPLOYE" } }).then(
                            (role) => {
                                userCreated.setRoles([role]).then(() => {
                                    res.json(userCreated);
                                });
                            }
                        );
                    })
                    .catch((error) => res.status(500).json({ error }));
            })
            .catch((error) => res.status(500).json({ error }));
    } else {
        return res
            .status(401)
            .json({
                message:
                    "Votre mot de passe ne contient pas les caractères attendus",
            });
    }
};

exports.login = (req, res) => {
    const data = { ...req.body };
    // Recherche de l'user avec son adresse email
    User.findOne({ where: { email: data.email.trim() }, include: ["roles"] })

        .then((userData) => {
            console.log(userData);
            const user = userData;
            if (!user) {
                return res
                    .status(401)
                    .json({ error: "Adresse email ou mot de passe incorrect" });
            }
            bcrypt
                // comparaison des mots de passe
                .compare(data.password, user.password)
                .then((valid) => {
                    console.log("valide", valid);
                    if (!valid) {
                        return res
                            .status(401)
                            .json({
                                error: "Adresse email ou mot de passe incorrect",
                            });
                    }
                    res.status(200).json({
                        pseudo: user.pseudo,
                        email: user.email,
                        roles: user.roles,
                        Userid: user.Userid,
                        token: jwt.sign(
                            { Userid: user.Userid },
                            process.env.RANDOM_SECRET_KEY,
                            { expiresIn: process.env.TOKEN_DELAY }
                        ),
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({ error });
                });
        })
        .catch((error) => res.status(500).json({ error }));
};

//-------------------------------------------------------------------------------

exports.getAllusers = (req, res) => {
    User.findAll({
        include: ["roles"], //as de init
    })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
        });
};

// récupération d'un user avec les posts que celui ci a créé
exports.getOneUser = (req, res) => {
    User.findByPk(req.params.id, {
        //findbyprimarykey
        include: ["roles", "posts"],
    })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json("User non trouvé");
        });
};

// Suppression du compte de l'user
exports.deleteUsers = async (req, res) => {
    try {
        await Commentaires.destroy({ where: { Userid: req.params.id } });
        await Posts.destroy({ where: { Userid: req.params.id } });
        await User.destroy({ where: { Userid: req.params.id } });
        return res
            .status(200)
            .json({ message: "L'utilisateur est supprimé !" });
    } catch (error) {
        return res.status(400).json({ error });
    }
};
