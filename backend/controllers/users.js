require("dotenv").config();
const bcrypt = require("bcrypt");
const passwordValidator = require("password-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Role = require("../models/roles");

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
        const user = await User.findOne({ where: { email: data.email } });
        if (user) {
            res.status(400).json("Adresse email déjà utilisée");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("Erreur interne du serveur");
    }

    if (passwordSchema.validate(data.password)) {
        bcrypt
            .hash(data.password, 10)
            .then((hash) => {
                data.password = hash;
                User.create({
                    email: data.email,
                    password: data.password,
                    pseudo: data.pseudo,
                })
                    .then((userCreated) => {
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
        return res.json({
            message:
                "Votre mot de passe ne contient pas les caractères attendus",
        });
    }
};

exports.login = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const data = { ...req.body };
    User.findOne({ where: { email: data.email }, include: ["roles"] })

        .then((userData) => {
            console.log(userData);
            const user = userData;
            if (!user) {
                return res
                    .status(401)
                    .json({ error: "Adresse email ou mot de passe incorrect" });
            }
            bcrypt
                .compare(data.password, user.password)
                .then((valid) => {
                    console.log('valide', valid)
                    if (!valid) {

                        return res.status(401).json({
                            error: "Adresse email ou mot de passe incorrect",
                        });
                    }
                    res.status(200).json({
                        email: user.email,
                        roles: user.roles,
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
};
