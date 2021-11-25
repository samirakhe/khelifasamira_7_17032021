const bcrypt = require("bcrypt");
const passwordValidator = require("password-validator");
const jwt = require("jsonwebtoken");
const Commentaire = require("../models/commentaires");
const Post = require("../models/posts");
require("dotenv").config();


exports.createComm = (req, res) => {
    const comm = req.body;
    comm.Userid = req.user.Userid;
    Commentaire.create(comm)
        .then((newcommentaire) => {
            res.json({
                ...newcommentaire.dataValues,
                user: { pseudo: req.user.pseudo },
            });
        })
        .catch((err) => {
            //console.log(err);
            res.status(500).send("Erreur server");
        });
};

exports.modifyComm = (req, res) => {
    const id = req.params.id;
    const userid= req.user.Userid;
    const data = req.body;
    Commentaire.update(data, { where: { Commentaireid: id, Userid: userid  }  })
    .then(
        (newcomm) => {
            return res.json(newcomm);
        }
    )
    .catch((err) =>{
        //console.log(err)
        res.status(500).send("Erreur server");
    });
};

exports.deleteComm = async (req, res) => {
    try {
        const comm = await Commentaire.findOne({
            where: { Commentaireid: req.params.id, Userid: req.user.Userid },
        });
        if (!comm) {
            return res.status(401).json("Action non autorisée");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json("Erreur interne du serveur");
    }
    Commentaire.destroy({
        where: { Commentaireid: req.params.id, Userid: req.user.Userid },
    })
        .then(() =>
            res.status(200).json({ message: "Le commentaire est supprimé !" })
        )
        .catch((error) => {
            console.log(error);
            res.status(400).json("Action non autorisée");
        });
};

exports.deleteCommbyAdmin = (req, res) => {
    Commentaire.destroy({ where: { Commentaireid: req.params.id } })
        .then(() =>
            res.status(200).json({ message: "Le commentaire est supprimé !" })
        )
        .catch((error) => {
            console.log(error);
            res.status(400).json("Erreur interne du serveur");
        });
};

exports.getAllCom = (req, res) => {
    Commentaire.findAll()
        .then((commentaire) => {
            res.json(commentaire);
        })
        .catch((err) => {
            console.log(err);
        });
};
