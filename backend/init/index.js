const Role = require("../models/roles");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const db = require("../models/db");
require("dotenv").config();

// Création  des roles en bdd
exports.initRoles = async () => {
    const roles = await Role.findAll();
    if (roles && roles.length > 0) {
        return;
    }
    //bulkcreate permet de créer plusieurs objets à la fois
    await Role.bulkCreate([{ nameRole: "ADMIN" }, { nameRole: "EMPLOYE" }]);
};

// Initialisation du role de l'admin
exports.initAdmin = () => {
    User.findOne({ where: { email: process.env.ADMIN_EMAIL } })
    .then((user) => {
        if (user) {
            return;
        }
        Role.findAll().then((roles) => {
            bcrypt
                .hash(process.env.ADMIN_PASSWORD, 10)
                .then((hash) => {
                    const password = hash;
                    User.create({
                        email: process.env.ADMIN_EMAIL,
                        password: password,
                        pseudo: process.env.ADMIN_PSEUDO,
                    })
                        //on attribue tous les roles à l'admin
                        .then((user) => {
                            user.setRoles(roles);
                            console.log("Administrateur créé");
                        })
                        .catch((error) => {
                            console.log(
                                "Erreur lors de l'enregistrement de l'administrateur"
                            );
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(
                        "Erreur lors de l'enregistrement de l'administrateur"
                    );
                    console.log(error);
                });
        });
    });
};
