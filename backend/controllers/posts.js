const { Sequelize, Models, DataTypes } = require("sequelize");
const express = require("express");
const bcrypt = require("bcrypt");
const passwordValidator = require("password-validator");
const jwt = require("jsonwebtoken");
const Post = require("../models/posts");
const User = require("../models/user");
const Commentaires = require("../models/commentaires");
const sequelize = require("../models/db");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();

exports.createPosts = (req, res) => {
    const post = req.body;
    // vérifier si le post contient un fichier image
    try {
        if (!req.file) {
            console.log("No file upload");
        } else {
            console.log(req.file.filename);
            post.image = `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
            }`;
        }
        // création du post avec les datas creation + les likes et les commentaires associés
        Post.create({ ...post, Userid: req.user.Userid }).then((post_cree) => {
            return res.json({
                ...post_cree.dataValues,
                user: { pseudo: req.user.pseudo },
                likes: [],
                commentaires: [],
            });
        });
    } catch {
        console.log(err);
    }
};

exports.modifyPosts = async (req, res) => {
    const id = req.params.id;
    //on vérifie si un fichier eest passé quand l'user fait la requete
    //si oui on cree un objet post avec une nouvelle iamge qui correspond a l'image passer par l'user
    //et s'il n'y a pas de fichier on cree un nouvel objet post
    const postImage = req.file
        ? {
              ...req.body,
              image: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
              }`,
          }
        : { ...req.body };

    try {
        //on recupere le post a partir de l'id du post et de l'id de l'user pour s'assurer que l'user est le proprietaire du post
        const post = await Post.findOne({
            where: { Postid: req.params.id, Userid: req.user.Userid },
        });
        // si aucun post n'est trouvé on renvoie un message d'erreur
        if (!post) {
            return res.status(401).json("Action non autorisée");
        }
        //on modifie le post quand l'id du post correpsond a l'id placé en paramètre dans l'url
        const response = await Post.update(postImage, {
            where: { Postid: id },
        });
        //on verifie si l'ancien post a une image ET que l'user passe une nouvelle image(req.fil = nouvelle image)
        if (post.image && req.file) {
            //on récupere le nom de l'image de l'ancien post
            const filename = post.image.split("images/")[1];
            //on verifie si cette image existe en tant que fichier, si oui, on la supprime
            if (fs.existsSync("backend/images/" + filename)) {
                fs.unlinkSync("backend/images/" + filename);
            }
        }
        const updatedPost = await Post.findByPk(id);
        return res.json(updatedPost);
    } catch (error) {
        console.log(error);
        res.status(500).json("Erreur interne du serveur");
    }
};

// Afficher tous les post par ordre decroissant
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

// Supprimer un post par le proprietaire du post
exports.deletePosts = async (req, res) => {
    try {
        const post = await Post.findOne({
            // On vérifie sur l'user est bien celui qui a crée le post
            where: { Postid: req.params.id, Userid: req.user.Userid },
        });
        if (!post) {
            return res.status(401).json("Action non autorisée");
        }
        Post.destroy({
            where: { Postid: req.params.id, Userid: req.user.Userid },
        })
            .then(() => {
                if (post.image) {
                    //on récupere le nom de l'image
                    const filename = post.image.split("images/")[1];
                    //on verifie si cette image existe en tant que fichier, si oui, on la supprime
                    if (fs.existsSync("backend/images/" + filename)) {
                        fs.unlinkSync("backend/images/" + filename);
                    }
                }
                res.status(200).json({ message: "Le post est supprimé !" });
            })
            .catch((error) => {
                console.log(error);
                res.status(400).json("Action non autorisée");
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Erreur interne du serveur");
    }
};

// Supprimer un post par l'admin
exports.deletePostsbyAdmin = (req, res) => {
    Post.destroy({ where: { Postid: req.params.id } })
        .then(() => res.status(200).json({ message: "Le post est supprimé !" }))
        .catch((error) => {
            console.log(error);
            res.status(400).json("Erreur interne du serveur");
        });
};
