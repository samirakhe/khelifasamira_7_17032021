const Commentaire = require("../models/commentaires");
require("dotenv").config();

//creation d'un commentaire contenant automatiquement les datas creation du commentaire-
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

// Modification d'un commentaire
// Vérification que l'user qui souhaite modifier soit le createur du commentaire
exports.modifyComm = (req, res) => {
    const id = req.params.id;
    const userid = req.user.Userid;
    const data = req.body;
    Commentaire.update(data, { where: { Commentaireid: id, Userid: userid } })
        .then((newcomm) => {
            return res.json(newcomm);
        })
        .catch((err) => {
            //console.log(err)
            res.status(500).send("Erreur server");
        });
};

// Supprimer un commentaire, spécifié à l'user qui a créé le commentaire.
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
            res.status(401).json("Action non autorisée");
        });
};

// Supprimer un commentaire, l'admin peut supprimer les commentaires même s'il ne les a pas créé
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

// Récupérer tous les commentaires
exports.getAllCom = (req, res) => {
    Commentaire.findAll()
        .then((commentaire) => {
            res.json(commentaire);
        })
        .catch((err) => {
            console.log(err);
        });
};
