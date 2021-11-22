const { Sequelize, Models, DataTypes } = require("sequelize");
const express = require("express");
const bcrypt = require("bcrypt");
const passwordValidator = require("password-validator");
const jwt = require("jsonwebtoken");
const Post = require("../models/posts");
const User = require("../models/user");
const Commentaires = require("../models/commentaires");
const sequelize = require("../models/db");
const multer = require('multer');
const fs = require('fs');
require("dotenv").config();

exports.getAllposts = (req, res) => {
    Post.findAll({
        include: [
            "likes",
            {
                model: Commentaires,
                as: "commentaires",
                attributes: ["Commentaireid", "commentaire", "createdAt"],
                include: [{ model: User, as: "user", attributes: ["pseudo"] }],
            },
            { model: User, as: "user", attributes: ["pseudo"] },
        ], //as de init
        order: [["createdAt", "DESC"]],
    })
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json("Posts non trouvés");
        });
};

exports.getOnePost = (req, res) => {
    Post.findByPk(req.params.id, {
        //findbyprimarykey
        include: ["likes", "commentaires"],
    })
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json("Post non trouvé");
        });
};



exports.createPosts = (req, res) => {
    
    const post = req.body;
    try{
        if (!req.file) {
        console.log("No file upload");
        } else {
        console.log(req.file.filename)
        post.image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
      
    }   
    Post.create({ ...post, Userid: req.user.Userid })
    .then((post_cree) => {
        return res.json({ ...post_cree.dataValues,
            user: { pseudo: req.user.pseudo },
            likes: [],
            commentaires: []

        });
    });}
    catch{
        console.log(err)
    }
};
 
//PREMIERE VERSION SANS IMAGE
// exports.createPosts = (req, res) => {
//     const post = req.body;
//     Post.create({ ...post, Userid: req.user.Userid })
//     .then((post_cree) => {
//         // post_cree.user = {pseudo: req.user.pseudo};
//         //console.log(post_cree)
//         return res.json({
//             ...post_cree.dataValues,
//             user: { pseudo: req.user.pseudo },
//             likes: [],
//             commentaires: []

//         });
//     });



 





exports.modifyPosts = async (req, res) => {

    const id = req.params.id;
    //on vérifie si un fichier eest passé quand l'user fait la requete, si oui on cree un objet post avec une nouvelle iamge qui correspond a limage passer par l'user
    //et sil n'y a pas de fichier on cree un nouvel objet post
    const postImage = req.file ? {...req.body,image: `${req.protocol}://${req.get("host")}/images/${req.file.filename }`}
    : { ...req.body };
  
    try {
        //on recupere le post a parti de l'id du post de l'id de l'user pour s'assurer le l'user est le proprietaire du post
        const post = await Post.findOne({
            where: { Postid: req.params.id, Userid: req.user.Userid },
        });
        // si aucun post n'est trouvé on renvoie un message d'erreur
        if (!post) {
            return res.status(401).json("Action non autorisée");
        }
        //on modifie le post quand l'id du post correpsond a l'id placé en paramètre dans l'url
        const response = await Post.update(postImage, { where: { Postid: id } })
        //on verifie si l'ancien post a une image et que l'user passe une nouvelle image(req.fil = nouvelle image)
        if(post.image && req.file){
            //on récupere le nom de l'image de l'ancien post
            const filename = post.image.split("images/")[1];
            //on verifie si cette image existe en tant que fichier(elle pourrait etre un attribut par exmeple), et si oui, on la supprime
            if(fs.existsSync("backend/images/" + filename)){
                fs.unlinkSync("backend/images/" + filename);
            }         
        }
        const updatedPost = await Post.findByPk(id)
        return res.json(updatedPost);
    } catch (error) {
        console.log(error);
        res.status(500).json("Erreur interne du serveur");
    }
    
}
    






// exports.modifyPosts = (req, res) => {
    
//     const id = req.params.id;
//     const data = req.body;
    
//     Post.update(data, { where: { Postid: id } })
//     .then((newpost) => {
//         return res.json(newpost);
//     });
// };








exports.deletePosts = async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { Postid: req.params.id, Userid: req.user.Userid },
        });
        if (!post) {
            return res.status(401).json("Action non autorisée");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("Erreur interne du serveur");
    }
    Post.destroy({ where: { Postid: req.params.id, Userid: req.user.Userid } })
        .then(() => res.status(200).json({ message: "Le post est supprimé !" }))
        .catch((error) => {
            console.log(error);
            res.status(400).json("Action non autorisée");
        });
};

exports.deletePostsbyAdmin = (req, res) => {
    Post.destroy({ where: { Postid: req.params.id } })
        .then(() => res.status(200).json({ message: "Le post est supprimé !" }))
        .catch((error) => {
            console.log(error);
            res.status(400).json("Erreur interne du serveur");
        });
};
