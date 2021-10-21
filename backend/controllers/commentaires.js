const bcrypt = require("bcrypt");
const passwordValidator = require("password-validator");
const jwt = require("jsonwebtoken");
const Commentaire = require("../models/commentaires");
const Post = require("../models/posts");
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
    const comm = req.body;
    Commentaire.create(comm)
    .then((newcommentaire) => {
        res.json(newcommentaire);
    }).catch ((err)=>{
        console.log(err);
        res.status(500).send('Erreur server');
    });
};
// exports.createComm = async (req, res) => {
//     try {
        
//         const createcomm = await Commentaire.findOne({where:{Postid : req.params.Postid}})
//         if(!createcomm){
//             return res.status(401).json('Action non autorisée')
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(500).json('Erreur interne du serveur')
//     }
//     Commentaire.create ({where:{Postid : req.params.Postid}})
//     .then((newcommentaire) =>
//         res
//             .status(200)
//             .json(newcommentaire)
//     )
//     .catch((error) => 
//     {console.log(error)
//     res.status(400).json('Action non autorisée')});
// };



exports.modifyComm = (req, res) => {
    const id = req.params.id;
    const data =  req.body;
    Commentaire.update ( data, { where: { Commentaireid: id} })
    .then ((newcomm) => {
        return res.json(newcomm);
    })
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

exports.deleteComm = async (req, res) => {
    try {
        
        const comm = await Commentaire.findOne({where:{Commentaireid : req.params.id, Userid: req.user.Userid}})
        if(!comm){
            return res.status(401).json('Action non autorisée')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json('Erreur interne du serveur')
    }
    Commentaire.destroy ({ where: { Commentaireid : req.params.id, Userid: req.user.Userid}})
    .then(() =>
        res
            .status(200)
            .json({ message: "Le commentaire est supprimé !" })
    )
    .catch((error) => 
    {console.log(error)
    res.status(400).json('Action non autorisée')});
};

exports.deleteCommbyAdmin = (req, res) => {
    Commentaire.destroy ({ where: { Commentaireid : req.params.id}})
    .then(() =>
        res
            .status(200)
            .json({ message: "Le commentaire est supprimé !" })
    )
    .catch((error) => 
    {console.log(error)
    res.status(400).json('Erreur interne du serveur')});
};
