const bcrypt = require("bcrypt");
const passwordValidator = require("password-validator");
const jwt = require("jsonwebtoken");
const Commentaire = require("../models/commentaires");
require("dotenv").config();

exports.getAllCom = (req, res) => {
    Commentaire.findAll()
        .then((commentaire) => {
            res.json(commentaire);
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.createComm = (req, res) => {
    const comm = {
        texte: "j'aime beaucoup ce post !",
    };
    Commentaire.create(comm);
};

exports.modifyComm = (req, res) => {
    // Commentaire.findOne({ _id: req.params.id, userId: req.user }).then((post) => {
    //     const commObject = req.file ? {
    //               ...JSON.parse(req.body.sauce),
    //               imageUrl: `${req.protocol}://${req.get("host")}/images/${
    //                   req.file.filename }`,
    //           } : { ...req.body };
    //     if (req.file) {
    //         const filename = post.imageUrl.split("/images")[1];
    //         fs.unlinkSync("images/" + filename);
    //     }

    //     Commentaire.updateOne({ _id: req.params.id }, { ...commObject })
    //         .then(() =>
    //             res.status(200).json({ message: "Le commentaire est modifié !" })
    //         )
    //         .catch((error) => res.status(400).json({ error }));
    // });
};

exports.deleteComm = (req, res) => {
    // Commentaire.destroy ({ where: { Commentaireid : req.params.id}})
    // .then(() =>
    //     res
    //         .status(200)
    //         .json({ message: "Le commentaire est supprimé !" })
    // )
    // .catch((error) => res.status(400).json({ error }));
};